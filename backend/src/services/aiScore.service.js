/**
 * AI Scoring Service
 * Provides heuristic-based scoring for resumes against job descriptions.
 */

export const calculateAIScore = ({ resumeText = "", job = {} }) => {
    let score = 0;
    const reasons = [];

    const resume = resumeText.toLowerCase();
    const jobSkills = (job.skills || "").toLowerCase().split(',').map(s => s.trim()).filter(s => s !== "");

    // 1. Skill Matching (Up to 50 points)
    if (jobSkills.length > 0) {
        const matchedSkills = jobSkills.filter(skill => resume.includes(skill));
        const skillScore = Math.round((matchedSkills.length / jobSkills.length) * 50);
        score += skillScore;

        if (matchedSkills.length > 0) {
            reasons.push(`Matched skills: ${matchedSkills.join(', ')} (+${skillScore} pts)`);
        } else {
            reasons.push(`No direct skill matches found for: ${jobSkills.join(', ')}`);
        }
    } else {
        reasons.push("No specific skills required for this job (0 skill points)");
    }

    // 2. Experience Keywords (Up to 30 points)
    let expScore = 0;
    const expKeywords = {
        'intern': 10,
        'internship': 10,
        'experience': 5,
        'years': 5,
        'senior': 15,
        'lead': 15,
        'engineer': 10,
        'developer': 10,
        'project': 5
    };

    const foundExp = [];
    Object.keys(expKeywords).forEach(kw => {
        if (resume.includes(kw)) {
            expScore += expKeywords[kw];
            foundExp.push(kw);
        }
    });

    expScore = Math.min(expScore, 30);
    score += expScore;
    if (foundExp.length > 0) {
        reasons.push(`Experience indicators found: ${foundExp.slice(0, 3).join(', ')} (+${expScore} pts)`);
    }

    // 3. Education Keywords (Up to 20 points)
    let eduScore = 0;
    const eduKeywords = {
        'bachelor': 10,
        'degree': 5,
        'master': 15,
        'university': 5,
        'college': 5,
        'phd': 20,
        'graduate': 5
    };

    const foundEdu = [];
    Object.keys(eduKeywords).forEach(kw => {
        if (resume.includes(kw)) {
            eduScore += eduKeywords[kw];
            foundEdu.push(kw);
        }
    });

    eduScore = Math.min(eduScore, 20);
    score += eduScore;
    if (foundEdu.length > 0) {
        reasons.push(`Education background: ${foundEdu.join(', ')} (+${eduScore} pts)`);
    }

    // Base score minimum
    if (score < 15 && resumeText.length > 100) {
        score = 15;
        reasons.push("Base score granted for submission length");
    }

    // Clamp total score
    const finalScore = Math.min(score, 100);

    return {
        score: finalScore,
        reasons: reasons
    };
};
