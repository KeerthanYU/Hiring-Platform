import api from "../../common/api/axios";

export const applyJob = async (jobId, resumeFile) => {
    console.log("📡 API applyJob calling...", { jobId, resumeFile });
    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("resume", resumeFile);

    try {
        const response = await api.post("/applications/apply", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("✅ API applyJob success:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ API applyJob failed:", error.response || error);
        throw error;
    }
};

