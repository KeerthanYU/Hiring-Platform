import express from "express";
import auth from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { applyJob } from "../controllers/application.controller.js";

const router = express.Router();

router.post("/", auth, roleMiddleware("candidate"), applyJob);

export default router;
