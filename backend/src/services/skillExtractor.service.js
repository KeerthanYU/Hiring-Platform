const SKILL_KEYWORDS = [
    "javascript", "react", "node", "express", "python",
    "java", "sql", "mongodb", "machine learning",
    "deep learning", "tensorflow", "pytorch",
    "html", "css", "docker", "aws", "kubernetes",
    "typescript", "next.js", "tailwind", "postgresql",
    "redis", "git", "ci/cd", "azure", "gcp"
];

export const extractSkills = (resumeText) => {
    if (!resumeText) return [];

    return SKILL_KEYWORDS.filter(skill => {
        // Use regex for whole word mapping to avoid partial matches (e.g., "java" in "javascript")
        const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        return regex.test(resumeText);
    });
};
