import api from "../api/axios";

// Fetch unread notifications
export const fetchNotifications = async () => {
    try {
        const response = await api.get("/notifications");
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Mark notification as read
export const markNotificationRead = async (id) => {
    try {
        const response = await api.put(`/notifications/${id}/read`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
