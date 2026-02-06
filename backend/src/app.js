import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.routes.js";
import jobRoutes from "./routes/job.routes.js";
import applicationRoutes from "./routes/application.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Hiring Platform Backend API is running",
        status: "Online",
        mongodb: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

export default app;
