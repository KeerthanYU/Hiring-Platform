import api from "./axios";

export const updateApplicationStatus = async (applicationId, status) => {
    try {
        const response = await api.patch(`/applications/${applicationId}/status`, { status });
        return response.data;
    } catch (error) {
        throw error;
    }
};
