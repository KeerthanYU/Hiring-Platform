import api from "../api/axios";

export const updateApplicationStatus = async (applicationId, status) => {
    try {
        const response = await api.put(`/applications/${applicationId}/status`, {
            status: status.toLowerCase()
        });
        return response.data;
    } catch (error) {
        console.error("Update status error:", error.response?.data || error.message);
        throw error;
    }
};
