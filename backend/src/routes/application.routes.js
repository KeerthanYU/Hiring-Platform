import express from "express";
import auth from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { applyJob } from "../controllers/application.controller.js";
import { uploadResume } from "../middleware/uploadResume.js";

const router = express.Router();

// Apply to a job (candidate only)
router.post(
    "/apply",
    auth,
    roleMiddleware("candidate"),
    uploadResume.single("resume"),
    applyJob
);

export default router;
