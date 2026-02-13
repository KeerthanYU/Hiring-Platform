import Notification from "../models/Notification.js";

// Get all notifications for a user (newest first)
export const getNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        const notifications = await Notification.findAll({
            where: { userId },
            order: [["createdAt", "DESC"]],
        });
        res.json(notifications);
    } catch (error) {
        console.error("Get notifications error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Mark a notification as read
export const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByPk(id);

        if (!notification) {
            console.warn(`⚠️ Notification not found: ID ${id}`);
            return res.status(404).json({ message: "Notification not found" });
        }

        // Use Number() to ensure type-safe comparison
        if (Number(notification.userId) !== Number(req.user.id)) {
            console.warn(`🚫 Unauthorized markAsRead attempt: User ${req.user.id} tried to read User ${notification.userId}'s notification ${id}`);
            return res.status(403).json({ message: "Not authorized" });
        }

        notification.isRead = true;
        await notification.save();

        res.json({ message: "Notification marked as read" });
    } catch (error) {
        console.error("❌ Mark notification read error:", {
            error: error.message,
            notificationId: req.params.id,
            userId: req.user?.id
        });
        res.status(500).json({ message: "Server error" });
    }
};
