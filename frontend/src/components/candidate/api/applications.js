import api from "../../common/api/axios";

export const applyJob = async (jobId, resumeFile) => {
    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("resume", resumeFile);

    const res = await api.post("/applications/apply", formData);

    return res.data;
};
