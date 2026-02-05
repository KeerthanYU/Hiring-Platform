import express from "express";
import auth from "../middleware/auth.middleware.js";
import { createJob, getJobs } from "../controllers/job.controller.js";

const router = express.Router();

router.post("/", auth, createJob);
router.get("/", getJobs);

export default router;
