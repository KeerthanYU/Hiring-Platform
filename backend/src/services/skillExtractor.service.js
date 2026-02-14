const SKILL_KEYWORDS = [
    "javascript", "react", "node", "express", "python",
    "java", "sql", "mongodb", "machine learning",
    "deep learning", "tensorflow", "pytorch",
    "html", "css", "docker", "aws"
];

export const extractSkills = (resumeText) => {
    return SKILL_KEYWORDS.filter(skill =>
        resumeText.includes(skill)
    );
};
