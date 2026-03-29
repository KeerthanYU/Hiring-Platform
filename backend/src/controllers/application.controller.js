import Application from "../models/Application.js";
import Job from "../models/Job.js";
import User from "../models/User.js";
import { calculateAIScore } from "../services/aiScore.service.js";
import Notification from "../models/Notification.js";
import { extractResumeText } from "../services/resumeParser.service.js";


// Get all applications for a recruiter
export const getRecruiterApplications = async (req, res) => {
    try {
        const recruiterId = req.user.id;
        console.log(`[RECRUITER] Fetching applications for Recruiter ID: ${recruiterId}`);

        const applications = await Application.findAll({
            where: { recruiterId },
            include: [
                {
                    model: Job,
                    as: "job",
                    attributes: ["title", "company"],
                },
                {
                    model: User,
                    as: "candidate",
                    attributes: ["name", "email", "id"],
                },
            ],
            order: [
                ["createdAt", "DESC"],
            ],
        });

        console.log(`[RECRUITER] Found ${applications.length} applications for Recruiter ID: ${recruiterId}`);
        res.json(applications);
    } catch (error) {
        console.error("❌ Get recruiter applications error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all applications for a candidate
export const getCandidateApplications = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const candidateId = req.user.id;

        const applications = await Application.findAll({
            where: { candidateId },
            include: [
                {
                    model: Job,
                    as: "job",
                    attributes: ["id", "title", "company", "location"],
                },
            ],
            order: [
                ["createdAt", "DESC"],
            ],
        });

        res.json(applications || []);
    } catch (error) {
        console.error("❌ Get candidate applications error:", {
            message: error.message,
            userId: req.user?.id
        });
        res.status(500).json({ message: "Internal server error" });
    }
};

export const applyJob = async (req, res) => {
    try {
        const candidateId = req.user.id;
        const { jobId, coverNote } = req.body;
        const user = req.user;

        // 1️⃣ Explicit jobId validation
        if (!jobId) {
            return res.status(400).json({
                success: false,
                message: "Job ID is required to apply",
            });
        }

        // 2️⃣ Role check
        if (user.role !== "candidate") {
            return res.status(403).json({
                success: false,
                message: "Only candidates can apply for jobs",
            });
        }

        // 3️⃣ Check job exists
        const job = await Job.findByPk(jobId);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        if (!job.createdBy) {
            return res.status(500).json({
                success: false,
                message: "Job recruiter mapping missing (createdBy is null)",
            });
        }

        // 4️⃣ Prevent duplicate applications
        const existingApplication = await Application.findOne({
            where: {
                jobId,
                candidateId: candidateId,
            },
        });

        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this job",
            });
        }

        // 5️⃣ Strict req.file check
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume file (PDF or DOCX) is required",
            });
        }

        console.log(`[APPLY] Processing application. Candidate: ${candidateId}, Job: ${jobId}`);

        // 6️⃣ Parse Resume text from buffer
        const resumeText = await extractResumeText(req.file.buffer, req.file.originalname);
        
        // 7️⃣ Calculate AI score with crash protection
        let aiScore = 0;
        let aiReason = "AI analysis failed or was skipped.";

        try {
            const { score, reasons } = calculateAIScore({
                resumeText: (resumeText || "") + " " + (coverNote || ""),
                job
            });
            aiScore = score;
            aiReason = reasons.join(" | ");
            console.log(`[APPLY] AI Score calculated: ${aiScore}`);
        } catch (scoreErr) {
            console.error("❌ [APPLY_AI_ERROR] AI Scoring failed, using fallback:", scoreErr.message);
            aiReason = "AI analysis component encountered an issue. Manual review suggested.";
        }

        // 8️⃣ Create application
        const application = await Application.create({
            candidateId: candidateId,
            jobId,
            recruiterId: job.createdBy,
            resumeUrl: `uploads/memory/${req.file.originalname}`, // Generic URL since in-memory
            coverNote: coverNote || null,
            aiScore,
            aiReason,
            status: "pending",
        });

        console.log(`[APPLY] Application created successfully. ID: ${application.id}`);

        // 9️⃣ Notify Recruiter
        try {
            await Notification.create({
                userId: job.createdBy,
                message: `New application received for ${job.title} from ${user.name || "a candidate"}`,
                type: "APPLICATION",
                relatedId: application.id,
            });
        } catch (notiErr) {
            console.warn("⚠️ [APPLY_NOTIFY_ERROR] Notification failed (non-critical):", notiErr.message);
        }

        return res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            application: {
                id: application.id,
                status: application.status,
                aiScore
            },
        });
    } catch (error) {
        console.error("❌ [APPLY_JOB_FATAL] Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to apply for job. Please try again later.",
        });
    }
};

export const updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params; // Using 'id' as per request
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ success: false, message: "Status is required" });
        }

        const normalizedStatus = status.toLowerCase();
        const allowedStatuses = ["pending", "shortlisted", "rejected", "hired"];

        if (!allowedStatuses.includes(normalizedStatus)) {
            return res.status(400).json({
                success: false,
                message: `Invalid status. Must be one of: ${allowedStatuses.join(", ")}`
            });
        }

        const application = await Application.findByPk(id, {
            include: {
                model: Job,
                as: "job"
            }
        });

        if (!application) {
            return res.status(404).json({ success: false, message: "Application not found" });
        }

        // Ensure recruiter owns the job (Job.createdBy)
        if (application.job.createdBy !== req.user.id) {
            return res.status(403).json({ success: false, message: "Access denied: You do not own this job posting" });
        }

        application.status = normalizedStatus;
        await application.save();

        // Trigger notification for the candidate
        try {
            await Notification.create({
                userId: application.candidateId,
                message: `Your application for ${application.job.title} has been ${normalizedStatus}`,
                type: "APPLICATION",
                relatedId: application.id,
            });
        } catch (notiErr) {
            console.error("Notification failed (non-critical):", notiErr);
        }

        res.json({
            success: true,
            message: "Status updated successfully",
            status: application.status
        });
    } catch (error) {
        console.error("Update application status error:", error);
        res.status(500).json({ success: false, message: "Failed to update status: " + error.message });
    }
};
