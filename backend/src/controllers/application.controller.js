import Application from "../models/Application.js";
import Job from "../models/Job.js";
import { calculateAIScore } from "../services/ai.service.js";

export const applyJob = async (req, res) => {
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

        // 5️⃣ Calculate AI score (basic for now)
        const aiScore = calculateAIScore({
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
            aiScore,
            status: "APPLIED",
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
