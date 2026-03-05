import Job from "../models/Job.js";
import { extractResumeText } from "../services/resumeParser.service.js";
import { extractSkills } from "../services/skillExtractor.service.js";
import { calculateJobMatchScore } from "../services/jobMatcher.service.js";
import { generateInterviewQuestions } from "../services/interviewQuestions.service.js";
import { generateResumeSuggestions } from "../services/resumeSuggestions.service.js";
import { calculateInterviewReadiness } from "../services/interviewReadiness.service.js";

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

export const analyzeResume = async (req, res) => {
    try {
        // ── 1. Validate ──
        if (!req.file) {
            console.error("❌ [RESUME_PARSE] No resume file in request.");
            return res.status(400).json({ message: "Resume file is required (.pdf or .docx)" });
        }

        console.log(`🚀 [RESUME_PARSE] Full analysis: file=${req.file.originalname}`);

        // ── 2. Parse Resume ──
        let resumeText = "";
        try {
            resumeText = await extractResumeText(req.file.path);
            console.log(`✅ [RESUME_PARSE] Extracted ${resumeText.length} characters`);
        } catch (parseErr) {
            console.error(`❌ [RESUME_PARSE] Failed: ${parseErr.message}`);
            return res.status(422).json({
                message: "Resume analysis failed. Please upload a valid resume.",
                error: parseErr.message,
            });
        }

        // ── 3. Extract Skills ──
        const skills = extractSkills(resumeText);
        console.log(`🔍 [SKILL_EXTRACT] Detected: [${skills.join(", ")}]`);

        // ── 4. Fetch Top Jobs & Calculate Scores ──
        const allJobs = await Job.findAll({ where: { status: "active" } });

        const scoredJobs = allJobs.map((job) => {
            const rawSkills = job.skills || "";
            const jobSkills = rawSkills ? rawSkills.split(",").map((s) => s.trim().toLowerCase()) : [];
            const { score, matchedSkills, missingSkills } = calculateJobMatchScore(skills, jobSkills);
            return {
                jobId: job.id,
                title: job.title,
                company: job.company,
                matchScore: score,
                matchedSkills,
                missingSkills,
            };
        });

        scoredJobs.sort((a, b) => b.matchScore - a.matchScore);
        const recommendedJobs = scoredJobs.slice(0, 5);

        // Aggregate missing skills from the top recommendation
        const topMissing = recommendedJobs.length > 0 ? recommendedJobs[0].missingSkills : [];

        // Best match score for readiness calc
        const bestScore = recommendedJobs.length > 0 ? recommendedJobs[0].matchScore : 0;

        console.log(`📈 [MATCH_SCORE] Top ${recommendedJobs.length} jobs scored`);

        // ── 5. Resume Score (avg of top 3 match scores) ──
        const topScores = recommendedJobs.slice(0, 3).map((j) => j.matchScore);
        const resumeScore = topScores.length > 0 ? Math.round(topScores.reduce((a, b) => a + b, 0) / topScores.length) : 0;

        // ── 6. Interview Readiness ──
        const { interviewReadiness, breakdown } = calculateInterviewReadiness(resumeText, skills, bestScore);
        console.log(`🎯 [INTERVIEW_READINESS] Score=${interviewReadiness}%`);

        // ── 7. Interview Questions ──
        const interviewQuestions = generateInterviewQuestions(skills, 5);

        // ── 8. Resume Suggestions ──
        const suggestions = generateResumeSuggestions(resumeText);

        // ── 9. Respond ──
        res.json({
            skills,
            resumeScore,
            interviewReadiness,
            readinessBreakdown: breakdown,
            recommendedJobs,
            missingSkills: topMissing,
            interviewQuestions,
            suggestions,
        });
    } catch (error) {
        console.error("❌ [ANALYZE_RESUME] Fatal error:", error.message, error.stack);
        res.status(500).json({
            message: "Internal server error during resume analysis",
            error: process.env.NODE_ENV === "development" ? error.message : undefined,
        });
    }
};
