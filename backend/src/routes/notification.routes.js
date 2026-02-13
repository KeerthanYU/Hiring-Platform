import express from "express";
import auth from "../middleware/auth.middleware.js";
import { getNotifications, markAsRead } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", auth, getNotifications);
router.patch("/:id/read", auth, markAsRead);
router.put("/:id/read", auth, markAsRead); // Support both PATCH and PUT

export default router;
