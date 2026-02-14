import axios from "../api/axios";

export const getJobRecommendations = async (resumeFile) => {
    const formData = new FormData();
    formData.append("resume", resumeFile);

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
