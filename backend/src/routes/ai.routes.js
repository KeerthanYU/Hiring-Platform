import express from "express";
import { matchResume } from "../controllers/ai.controller.js";
import { uploadResume as upload } from "../middleware/uploadResume.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
    "/match-resume",
    auth,
    upload.single("resume"),
    matchResume
);

export default router;
