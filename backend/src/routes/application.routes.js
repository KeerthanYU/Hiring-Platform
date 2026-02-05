import express from "express";
import auth from "../middleware/auth.middleware.js";
import { applyJob } from "../controllers/application.controller.js";

const router = express.Router();

router.post("/", auth, applyJob);

export default router;
