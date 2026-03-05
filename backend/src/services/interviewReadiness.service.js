export const calculateInterviewReadiness = (resumeText, detectedSkills, matchScore) => {
    let skillScore = 0;
    let projectScore = 0;
    let experienceScore = 0;
    let qualityScore = 0;

    // ── Skill Match (50%) ──
    // Based on how many skills were detected (max around 10+ is excellent)
    const skillCount = detectedSkills.length;
    if (skillCount >= 8) skillScore = 50;
    else if (skillCount >= 5) skillScore = 40;
    else if (skillCount >= 3) skillScore = 30;
    else if (skillCount >= 1) skillScore = 15;
    else skillScore = 0;

    // ── Projects Detected (20%) ──
    const projectKeywords = ["project", "built", "developed", "created", "implemented", "designed", "deployed"];
    const projectMatches = projectKeywords.filter((kw) => resumeText.includes(kw)).length;
    if (projectMatches >= 4) projectScore = 20;
    else if (projectMatches >= 2) projectScore = 15;
    else if (projectMatches >= 1) projectScore = 10;
    else projectScore = 0;

    // ── Experience Keywords (20%) ──
    const experienceKeywords = ["experience", "intern", "worked", "company", "role", "position", "engineer", "developer", "analyst"];
    const expMatches = experienceKeywords.filter((kw) => resumeText.includes(kw)).length;
    if (expMatches >= 4) experienceScore = 20;
    else if (expMatches >= 2) experienceScore = 15;
    else if (expMatches >= 1) experienceScore = 10;
    else experienceScore = 0;

    // ── Resume Quality (10%) ──
    const qualityChecks = [
        resumeText.length > 500,
        /github|gitlab|portfolio/i.test(resumeText),
        /\d+%|\d+ users/i.test(resumeText),
        /certif/i.test(resumeText),
        /bachelor|master|degree|b\.tech/i.test(resumeText),
    ];
    const qualityMatches = qualityChecks.filter(Boolean).length;
    if (qualityMatches >= 4) qualityScore = 10;
    else if (qualityMatches >= 2) qualityScore = 7;
    else if (qualityMatches >= 1) qualityScore = 4;
    else qualityScore = 0;

    const totalScore = Math.min(skillScore + projectScore + experienceScore + qualityScore, 100);

    return {
        interviewReadiness: totalScore,
        breakdown: {
            skillMatch: skillScore,
            projects: projectScore,
            experience: experienceScore,
            resumeQuality: qualityScore,
        },
    };
};
