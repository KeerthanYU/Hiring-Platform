export const calculateJobMatchScore = (resumeSkills, jobSkills) => {
    if (!jobSkills || jobSkills.length === 0) {
        return { score: 0, matchedSkills: [], missingSkills: [] };
    }

    const matchedSkills = jobSkills.filter(skill =>
        resumeSkills.includes(skill)
    );

    const missingSkills = jobSkills.filter(skill =>
        !resumeSkills.includes(skill)
    );

    const score = Math.round(
        (matchedSkills.length / jobSkills.length) * 100
    );

    return {
        score,
        matchedSkills,
        missingSkills
    };
};
