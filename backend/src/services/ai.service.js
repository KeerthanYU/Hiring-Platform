/**
 * Simulates an AI analysis of a resume.
 * In a real-world scenario, this would call an OpenAI/Gemini API.
 */
export const calculateAIScore = async ({ resumePath, jobId }) => {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate a random score between 60 and 95
    const score = Math.floor(Math.random() * (95 - 60 + 1)) + 60;

    // Simulate extracting key skills and feedback
    const feedback = {
        strengths: [
            "Strong relevant experience",
            "Good educational background",
            "Clear project descriptions",
        ],
        weaknesses: [
            "Could improve quantifiable metrics in resume",
            "Some skills listed are outdated",
        ],
        skills: ["React", "Node.js", "SQL", "Team Leadership", "Agile"],
        summary: `Candidate shows strong promise with a match score of ${score}%. Recommended for interview.`,
    };

    return { score, feedback };
};
