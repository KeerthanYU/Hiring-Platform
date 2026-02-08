import api from "../../common/api/axios";

export const applyJob = async (jobId, resumeFile) => {
    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("resume", resumeFile);

    try {
        const response = await api.post("/applications/apply", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

