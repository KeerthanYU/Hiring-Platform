import Application from "../models/Application.js";
import { calculateAIScore } from "../services/ai.service.js";

export const applyJob = async (req, res) => {
    const score = calculateAIScore();

    const application = await Application.create({
        candidate: req.user.id,
        job: req.body.jobId,
        resumeUrl: "uploaded_resume.pdf",
        aiScore: score
    });

    res.json(application);
};
