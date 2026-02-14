import Application from "../models/Application.js";
import Job from "../models/Job.js";
import User from "../models/User.js";
import { calculateAIScore } from "../services/aiScore.service.js";
import Notification from "../models/Notification.js";

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

        // 1️⃣ Role check
        if (user.role !== "candidate") {
            return res.status(403).json({
                message: "Only candidates can apply for jobs",
            });
        }

        // 2️⃣ Check job exists
        const job = await Job.findByPk(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
            });
        }

        if (!job.createdBy) {
            return res.status(500).json({
                message: "Job recruiter mapping missing (createdBy is null)",
            });
        }

        // 3️⃣ Prevent duplicate applications
        const existingApplication = await Application.findOne({
            where: {
                jobId,
                candidateId: candidateId,
            },
        });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
            });
        }

        // 4️⃣ Resume required
        if (!req.file) {
            return res.status(400).json({
                message: "Resume is required (PDF only)",
            });
        }

        // Normalize path (fix Windows backslashes)
        const resumePath = req.file.path.replace(/\\/g, "/");

        console.log(`[APPLY] Creating application. Candidate: ${candidateId}, Job: ${jobId}, Recruiter: ${job.createdBy}`);

        // 5️⃣ Calculate AI score
        let aiScore = 0;
        let aiReason = "AI analysis failed during processing.";

        try {
            const { score, reasons } = calculateAIScore({
                resumeText: (req.file.originalname || "") + " " + (coverNote || ""),
                job
            });
            aiScore = score;
            aiReason = reasons.join(" | ");
        } catch (scoreErr) {
            console.error("AI Scoring failed, proceeding with default score:", scoreErr);
        }

        // 6️⃣ Create application
        const application = await Application.create({
            candidateId: candidateId,
            jobId,
            recruiterId: job.createdBy, // Correctly assign recruiterId using job.createdBy
            resumeUrl: resumePath,
            coverNote: coverNote || null,
            aiScore,
            aiReason,
            status: "APPLIED",
        });

        console.log(`[APPLY] Application created successfully. ID: ${application.id}`);

        // 7️⃣ Notify Recruiter
        await Notification.create({
            userId: job.createdBy,
            message: `New application received for ${job.title} from ${user.name || "a candidate"}`,
            type: "APPLICATION",
            relatedId: application.id,
        });

        return res.status(201).json({
            message: "Application submitted successfully",
            application: {
                id: application.id,
                status: application.status
            },
        });
    } catch (error) {
        console.error("Apply job error:", error);
        return res.status(500).json({
            message: "Failed to apply for job",
        });
    }
};

export const updateApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;

        const allowedStatuses = [
            'APPLIED',
            'REVIEWED',
            'SHORTLISTED',
            'REJECTED',
            'HIRED'
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status. Must be one of: ' + allowedStatuses.join(', ') });
        }

        const application = await Application.findByPk(applicationId, {
            include: {
                model: Job,
                as: "job"
            }
        });

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Ensure recruiter owns the job (Job.createdBy)
        if (application.job.createdBy !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        application.status = status;
        await application.save();

        // Trigger notification for the candidate
        await Notification.create({
            userId: application.candidateId,
            message: `Your application for ${application.job.title} has been ${status.toLowerCase()}`,
            type: "APPLICATION",
            relatedId: application.id,
        });

        res.json({
            message: 'Status updated',
            status: application.status
        });
    } catch (error) {
        console.error("Update application status error:", error);
        res.status(500).json({ message: 'Failed to update status' });
    }
};
