import { SKILL_KEYWORDS } from '../utils/skillsList.js';

export const extractSkills = (resumeText) => {
    if (!resumeText) return [];

    return SKILL_KEYWORDS.filter(skill => {
        // Use regex for whole word mapping to avoid partial matches (e.g., "java" in "javascript")
        const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        return regex.test(resumeText);
    });
};
