import express from "express";
import { recommendJobsFromResume } from "../controllers/jobMatch.controller.js";
import { uploadResume as upload } from "../middleware/uploadResume.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
    "/recommend",
    auth,
    upload.single("resume"),
    recommendJobsFromResume
);

export default router;
