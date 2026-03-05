export const generateResumeSuggestions = (resumeText) => {
    const suggestions = [];

    if (!resumeText || resumeText.length < 100) {
        suggestions.push("Your resume appears too short. Add more detail about your experience and projects.");
        return suggestions;
    }

    // Check for GitHub/portfolio links
    if (!resumeText.includes("github") && !resumeText.includes("gitlab") && !resumeText.includes("bitbucket")) {
        suggestions.push("Add GitHub or portfolio links to showcase your projects.");
    }

    // Check for measurable achievements
    const hasNumbers = /\d+%|\d+ users|\d+ projects|\$\d+|\d+x/i.test(resumeText);
    if (!hasNumbers) {
        suggestions.push("Include measurable achievements (e.g., 'Increased performance by 30%', 'Served 10K+ users').");
    }

    // Check for project mentions
    if (!resumeText.includes("project") && !resumeText.includes("built") && !resumeText.includes("developed")) {
        suggestions.push("Mention specific projects you have built or contributed to.");
    }

    // Check for certifications
    if (!resumeText.includes("certif") && !resumeText.includes("certified")) {
        suggestions.push("Add relevant certifications (e.g., AWS Certified, Google Cloud, etc.).");
    }

    // Check for education details
    if (!resumeText.includes("bachelor") && !resumeText.includes("master") && !resumeText.includes("degree") && !resumeText.includes("b.tech") && !resumeText.includes("b.e")) {
        suggestions.push("Clearly mention your educational qualifications.");
    }

    // Check for internship/experience
    if (!resumeText.includes("intern") && !resumeText.includes("experience") && !resumeText.includes("worked at")) {
        suggestions.push("Include internship or professional work experience.");
    }

    // Check for frameworks
    if (!resumeText.includes("framework") && !resumeText.includes("react") && !resumeText.includes("django") && !resumeText.includes("express") && !resumeText.includes("spring")) {
        suggestions.push("Mention specific frameworks you have used.");
    }

    // Check for soft skills
    if (!resumeText.includes("team") && !resumeText.includes("leadership") && !resumeText.includes("communication")) {
        suggestions.push("Highlight soft skills like teamwork, leadership, and communication.");
    }

    // If resume is well-written
    if (suggestions.length === 0) {
        suggestions.push("Great resume! Consider keeping it updated with your latest projects.");
    }

    return suggestions;
};
