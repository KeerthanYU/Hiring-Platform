import express from "express";
import auth from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { createJob, getJobs } from "../controllers/job.controller.js";

const router = express.Router();

router.post("/", auth, roleMiddleware("recruiter"), createJob);
router.get("/", auth, getJobs);

export default router;
