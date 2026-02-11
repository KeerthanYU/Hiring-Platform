import express from "express";
import auth from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
    applyJob,
    getRecruiterApplications,
    updateApplicationStatus
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
    (req, res, next) => {
        console.log("🚀 Route /api/applications/apply hit");
        next();
    },
    auth,
    roleMiddleware("candidate"),
    uploadResume.single("resume"),
    applyJob
);
router.patch(
    '/:applicationId/status',
    auth,
    roleMiddleware('recruiter'),
    updateApplicationStatus
);

export default router;
