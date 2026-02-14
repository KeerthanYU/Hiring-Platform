import Job from "../models/Job.js";
import { extractResumeText } from "../services/resumeParser.service.js";
import { extractSkills } from "../services/skillExtractor.service.js";
import { calculateJobMatchScore } from "../services/jobMatcher.service.js";

export const recommendJobsFromResume = async (req, res) => {
    try {
        const resumePath = req.file.path;

        const resumeText = await extractResumeText(resumePath);
        const resumeSkills = extractSkills(resumeText);

        const jobs = await Job.findAll({ where: { status: "active" } });

        const recommendations = jobs.map(job => {
            const jobSkills = (job.skills || "").split(",").map(s => s.trim().toLowerCase());

            const { score, matchedSkills } =
                calculateJobMatchScore(resumeSkills, jobSkills);

            return {
                jobId: job.id,
                title: job.title,
                company: job.company,
                score,
                matchedSkills
            };
        });

        recommendations.sort((a, b) => b.score - a.score);

        res.json({
            resumeSkills,
            bestMatches: recommendations.slice(0, 3)
        });

    } catch (error) {
        res.status(500).json({ message: "Job matching failed" });
    }
};
