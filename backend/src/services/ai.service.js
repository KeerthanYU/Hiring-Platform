// backend/src/services/ai.service.js

export const calculateAIScore = ({ resumeText, job }) => {
    let score = 0;
    const strengths = [];
    const weaknesses = [];
    const skills = [];

    // 🔹 Skill matching (basic keyword approach)
    if (job.skills && resumeText) {
        const skillList = job.skills.toLowerCase().split(',');
        const resume = resumeText.toLowerCase();

        const matched = skillList.filter(skill =>
            resume.includes(skill.trim())
        );

        score += Math.min(matched.length * 10, 50);
        matched.forEach(s => skills.push(s.trim()));

        if (matched.length > 0) {
            strengths.push(`Matched ${matched.length} required skills`);
        }
        if (matched.length < skillList.length) {
            weaknesses.push(`Missing ${skillList.length - matched.length} required skills`);
        }
    }

    // 🔹 Experience weighting
    if (resumeText && resumeText.includes('intern')) {
        score += 10;
        strengths.push('Has internship experience');
    }
    if (resumeText && resumeText.includes('engineer')) {
        score += 15;
        strengths.push('Engineering background');
    }

    // 🔹 Education hints
    if (resumeText && resumeText.includes('bachelor')) {
        score += 10;
        strengths.push("Bachelor's degree");
    }
    if (resumeText && resumeText.includes('master')) {
        score += 15;
        strengths.push("Master's degree");
    }

    // Base score for submitting an application
    if (score === 0) {
        score = 10;
    }

    // Clamp score
    score = Math.min(score, 100);

    return {
        score,
        feedback: {
            strengths,
            weaknesses,
            skills
        }
    };
};
