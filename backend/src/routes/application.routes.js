import express from "express";
import auth from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
    applyJob,
    getRecruiterApplications
} from "../controllers/application.controller.js";
import { uploadResume } from "../middleware/uploadResume.js";

const router = express.Router();

// Get all applications for the logged-in recruiter
router.get(
    "/recruiter",
    auth,
    roleMiddleware("recruiter"),
    getRecruiterApplications
);

// Apply to a job (candidate only)
router.post(
    "/apply",
    auth,
    roleMiddleware("candidate"),
    uploadResume.single("resume"),
    applyJob
);

export default router;
