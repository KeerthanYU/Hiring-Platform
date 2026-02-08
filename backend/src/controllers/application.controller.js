import Application from "../models/Application.js";
import Job from "../models/Job.js";
import User from "../models/User.js"; // Import User model
import { calculateAIScore } from "../services/ai.service.js";
import Notification from "../models/Notification.js";

// Get all applications for a recruiter
export const getRecruiterApplications = async (req, res) => {
    try {
        const recruiterId = req.user.id;

        const applications = await Application.findAll({
            where: { recruiterId },
            include: [
                {
                    model: Job,
                    attributes: ["title", "company"],
                },
                {
                    model: User,
                    as: "candidate", // Ensure this alias matches your association in db.js or models
                    attributes: ["name", "email", "id"],
                },
            ],
            order: [["createdAt", "DESC"]],
        });

        res.json(applications);
    } catch (error) {
        console.error("Get recruiter applications error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const applyJob = async (req, res) => {
    console.log("👉 applyJob controller hit!");
    console.log("📦 Body:", req.body);
    console.log("📂 File:", req.file);
    console.log("👤 User:", req.user);

    try {
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

        // 3️⃣ Prevent duplicate applications
        const existingApplication = await Application.findOne({
            where: {
                jobId,
                candidateId: user.id,
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

        // 5️⃣ Calculate AI score and feedback
        const { score, feedback } = await calculateAIScore({
            resumePath: req.file.path,
            jobId,
        });

        // 6️⃣ Create application
        const application = await Application.create({
            candidateId: user.id,
            jobId,
            recruiterId: job.recruiterId,
            resumeUrl: req.file.path,
            coverNote: coverNote || null,
            aiScore: score,
            aiFeedback: feedback,
            status: "APPLIED",
        });

        // 7️⃣ Notify Recruiter
        await Notification.create({
            userId: job.recruiterId,
            message: `New application received for ${job.title} from ${user.name || "a candidate"}`,
            type: "APPLICATION",
            relatedId: application.id,
        });

        return res.status(201).json({
            message: "Application submitted successfully",
            application,
        });
    } catch (error) {
        console.error("Apply job error:", error);
        return res.status(500).json({
            message: "Failed to apply for job",
        });
    }
};
