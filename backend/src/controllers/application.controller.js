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

    try {
        const { jobId, coverNote } = req.body;
        const user = req.user;
        const job = await Job.findByPk(jobId);

        console.log("📦 Body:", req.body);
        console.log("📂 File:", req.file);
        console.log("👤 User:", user ? user.id : "No User");
        console.log("JOB ID:", jobId);

        // Normalize path (fix Windows backslashes)
        const resumePath = req.file ? req.file.path.replace(/\\/g, "/") : null;

        if (job) {
            console.log("JOB DATA:", job.toJSON());
            console.log("JOB.createdBy:", job.createdBy);
        } else {
            console.log("JOB NOT FOUND for ID:", jobId);
        }

        // 1️⃣ Role check
        if (user.role !== "candidate") {
            return res.status(403).json({
                message: "Only candidates can apply for jobs",
            });
        }

        // 2️⃣ Check job exists
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
            resumePath: resumePath, // Use normalized path
            jobId,
        });

        // 6️⃣ Create application
        const application = await Application.create({
            candidateId: user.id,
            jobId,
            recruiterId: job.createdBy,
            resumeUrl: resumePath, // Use normalized path
            coverNote: coverNote || null,
            aiScore: score,
            aiFeedback: feedback,
            status: "APPLIED",
        });

        // 7️⃣ Notify Recruiter
        await Notification.create({
            userId: job.createdBy, // Fixed: Use createdBy as userId
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
