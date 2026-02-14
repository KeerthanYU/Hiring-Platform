import Job from "../models/Job.js";
import { extractResumeText } from "../services/resumeParser.service.js";
import { extractSkills } from "../services/skillExtractor.service.js";
import { calculateJobMatchScore } from "../services/jobMatcher.service.js";

export const recommendJobsFromResume = async (req, res) => {
    try {
        const { jobId } = req.body;

        // 1. Initial Validation
        if (!req.file) {
            console.error("❌ [JOB_MATCH_ERROR] Resume file missing in request.");
            return res.status(400).json({ message: "Resume file is required (.pdf or .docx)" });
        }

        console.log(`🚀 [JOB_MATCH] Recommendation request: jobId=${jobId || 'ALL'}, file=${req.file.originalname}`);

        // 2. Resume Parsing
        let resumeText;
        try {
            resumeText = await extractResumeText(req.file.path);
        } catch (parseErr) {
            return res.status(500).json({ message: "Failed to parse resume content", error: parseErr.message });
        }

        const resumeSkills = extractSkills(resumeText);
        if (resumeSkills.length === 0) {
            console.warn("⚠️ [JOB_MATCH] No skills identified from resume.");
        }

        // 3. Job Fetching & Validation
        let jobs = [];
        if (jobId) {
            // Validate jobId is numeric/valid if needed, but Sequelize handles findByPk safely
            const job = await Job.findByPk(jobId);
            if (!job) {
                console.warn(`⚠️ [JOB_MATCH] Target job ID ${jobId} not found.`);
                return res.status(404).json({ message: `Job with ID ${jobId} not found.` });
            }
            jobs = [job];
        } else {
            jobs = await Job.findAll({ where: { status: "active" } });
            if (jobs.length === 0) {
                return res.json({ resumeSkills, bestMatches: [], message: "No active jobs found for matching." });
            }
        }

        // 4. Scoring Logic
        const recommendations = jobs.map(job => {
            const rawSkills = job.skills || "";
            const jobSkills = rawSkills ? rawSkills.split(",").map(s => s.trim().toLowerCase()) : [];

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

        // 5. Success Response
        res.json({
            resumeSkills,
            bestMatches: recommendations.slice(0, 3)
        });

    } catch (error) {
        console.error("❌ [JOB_MATCH_ERROR] Fatal error in recommendation flow:", {
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({
            message: "Internal server error during job matching",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
