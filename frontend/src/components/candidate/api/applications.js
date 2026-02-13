import api from "../../../api/axios";

export const applyJob = async (jobId, resumeFile) => {
    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("resume", resumeFile);

    const res = await api.post("/applications/apply", formData);

    return res.data;
};// Fetch all applications for the logged-in candidate
export const fetchCandidateApplications = async () => {
    try {
        const response = await api.get("/applications/candidate");
        return response.data;
    } catch (error) {
        console.error("Fetch candidate applications failed:", error);
        throw error;
    }
};
