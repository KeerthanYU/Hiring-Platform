import axios from "../api/axios";

export const getJobRecommendations = async (resumeFile, jobId = null) => {
    const formData = new FormData();
    formData.append("resume", resumeFile);
    if (jobId) {
        formData.append("jobId", jobId);
    }

    const response = await axios.post(
        "/job-match/recommend",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};
