import axios from "../api/axios";

export const matchResumeWithJob = async (resumeFile, jobId) => {
    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobId", jobId);

    const response = await axios.post(
        "/ai/match-resume",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

export const analyzeResume = async (resumeFile) => {
    const formData = new FormData();
    formData.append("resume", resumeFile);

    const response = await axios.post(
        "/ai/analyze-resume",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};
