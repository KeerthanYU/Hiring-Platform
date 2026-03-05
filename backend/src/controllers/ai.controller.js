import Job from "../models/Job.js";
import { extractResumeText } from "../services/resumeParser.service.js";
import { extractSkills } from "../services/skillExtractor.service.js";
import { calculateJobMatchScore } from "../services/jobMatcher.service.js";

export const matchResume = async (req, res) => {
    try {
        const { jobId } = req.body;

        // ── 1. Validate Inputs ──
        if (!req.file) {
            console.error("❌ [RESUME_PARSE] No resume file in request.");
            return res.status(400).json({ message: "Resume file is required (.pdf or .docx)" });
        }

        if (!jobId) {
            console.error("❌ [MATCH_SCORE] No jobId provided.");
            return res.status(400).json({ message: "jobId is required" });
        }

        console.log(`🚀 [RESUME_PARSE] Processing: file=${req.file.originalname}, jobId=${jobId}`);

        // ── 2. Parse Resume ──
        let resumeText = "";
        try {
            resumeText = await extractResumeText(req.file.path);
            console.log(`✅ [RESUME_PARSE] Extracted ${resumeText.length} characters`);
        } catch (parseErr) {
            console.error(`❌ [RESUME_PARSE] Failed: ${parseErr.message}`);
            return res.status(422).json({
                message: "Failed to parse resume. Ensure the file is a valid PDF or DOCX.",
                error: parseErr.message,
            });
        }

        // ── 3. Extract Skills ──
        const extractedSkills = extractSkills(resumeText);
        console.log(`🔍 [SKILL_EXTRACT] Detected: [${extractedSkills.join(", ")}]`);

        // ── 4. Fetch Job ──
        const job = await Job.findByPk(jobId);
        if (!job) {
            console.warn(`⚠️ [MATCH_SCORE] Job ID ${jobId} not found.`);
            return res.status(404).json({ message: `Job with ID ${jobId} not found.` });
        }

        const rawSkills = job.skills || "";
        const jobSkills = rawSkills
            ? rawSkills.split(",").map((s) => s.trim().toLowerCase())
            : [];

        // ── 5. Calculate Match Score ──
        const { score, matchedSkills, missingSkills } = calculateJobMatchScore(
            extractedSkills,
            jobSkills
        );

        console.log(`📈 [MATCH_SCORE] Job="${job.title}" | Score=${score}% | Matched=${matchedSkills.length} | Missing=${missingSkills.length}`);

        // ── 6. Respond ──
        res.json({
            jobTitle: job.title,
            jobCompany: job.company,
            extractedSkills,
            jobSkills,
            matchedSkills,
            missingSkills,
            matchScore: score,
        });
    } catch (error) {
        console.error("❌ [MATCH_SCORE] Fatal error:", error.message, error.stack);
        res.status(500).json({
            message: "Internal server error during resume matching",
            error: process.env.NODE_ENV === "development" ? error.message : undefined,
        });
    }
};
