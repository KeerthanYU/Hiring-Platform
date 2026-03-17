import dotenv from 'dotenv';
dotenv.config(); // MUST be first, before any env var usage
import fs from 'fs';
console.log("🚀 Server script starting with PostgreSQL...");

import express from 'express';
import cors from 'cors';
import passport from 'passport';
import path from 'path';
import sequelize from '../config/database.js';
console.log("📦 Sequelize/PostgreSQL imported");

// Import passport strategy config (registers the Google OAuth strategy)
import './config/passport.js';
console.log("📦 Passport config imported");

// Import models + associations
import './models/associations.js';
console.log("📦 Associations imported");

// Routes
import authRoutes from './routes/auth.routes.js';
import googleAuthRoutes from './routes/googleAuth.routes.js';
import userRoutes from './routes/user.routes.js';
import jobRoutes from './routes/job.routes.js';
import applicationRoutes from './routes/application.routes.js';
import adminRoutes from './routes/admin.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import jobMatchRoutes from './routes/jobMatch.routes.js';
import aiRoutes from './routes/ai.routes.js';
console.log("📦 All routes imported");

const app = express();

// =======================
// 🌐 Global Middleware
// =======================
app.use(
    cors({
        origin: process.env.GOOGLE_CALLBACK_URL,
        credentials: true,
    })
);

app.use(express.json());

// =======================
// 🔐 Passport Init
// =======================
app.use(passport.initialize());

// =======================
// 📁 Static Files (Resumes)
// =======================
app.use("/uploads", express.static(path.resolve("uploads")));

// =======================
// 🩺 Health Check
// =======================
app.get("/", (req, res) => {
    res.json({
        message: "Hiring Platform Backend API is running",
        status: "Online",
        database: "PostgreSQL (Sequelize)",
    });
});

// =======================
// 🚏 API Routes
// =======================
app.use("/api/auth", authRoutes);
app.use("/api/auth", googleAuthRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/job-match", jobMatchRoutes);
app.use("/api/ai", aiRoutes);


// =======================
// 📁 Ensure Uploads Dir
// =======================
const uploadsDir = path.resolve("uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
    console.log("📁 Created uploads directory");
}

// =======================
// 🚀 Start Server
// =======================
const PORT = process.env.PORT || 5000;

console.log("🔄 Syncing database...");
sequelize
    .sync({ alter: false })
    .then(() => {
        console.log("✅ Database synced successfully (PostgreSQL)");
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Database sync failed CRITICAL:", err);
        process.exit(1);
    });