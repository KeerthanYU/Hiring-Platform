// backend/src/services/aiScore.service.js

export const calculateAIScore = ({ resumeText, job }) => {
    let score = 0;

    // 🔹 Skill matching (basic keyword approach)
    if (job.skills && resumeText) {
        const skills = job.skills.toLowerCase().split(',');
        const resume = resumeText.toLowerCase();

        const matched = skills.filter(skill =>
            resume.includes(skill.trim())
        );

        score += Math.min(matched.length * 10, 50);
    }

    // 🔹 Experience weighting
    if (resumeText.includes('intern')) score += 10;
    if (resumeText.includes('engineer')) score += 15;

    // 🔹 Education hints
    if (resumeText.includes('bachelor')) score += 10;
    if (resumeText.includes('master')) score += 15;

    // Clamp score
    return Math.min(score, 100);
};
