import api from "../../common/api/axios";

// Fetch applications for the logged-in recruiter
export const fetchRecruiterApplications = async () => {
    try {
        const response = await api.get("/applications/recruiter");
        return response.data;
    } catch (error) {
        throw error;
    }
};
