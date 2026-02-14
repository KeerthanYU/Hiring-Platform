export const calculateJobMatchScore = (resumeSkills, jobSkills) => {
    const matchedSkills = resumeSkills.filter(skill =>
        jobSkills.includes(skill)
    );

    const score = Math.round(
        (matchedSkills.length / jobSkills.length) * 100
    );

    return {
        score,
        matchedSkills
    };
};
