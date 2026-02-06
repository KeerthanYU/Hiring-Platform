import Application from "../models/Application.js";
import { calculateAIScore } from "../services/ai.service.js";

export const applyJob = async (req, res) => {
    try {
        const score = calculateAIScore();

        const application = await Application.create({
            candidateId: req.user.id,
            jobId: req.body.jobId,
            resumeUrl: "uploaded_resume.pdf",
            aiScore: score
        });

        res.json(application);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
