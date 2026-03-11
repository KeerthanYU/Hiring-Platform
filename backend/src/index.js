import dotenv from 'dotenv';
dotenv.config(); // MUST be first, before any env var usage
console.log("🚀 Server script starting...");

import express from 'express';
console.log("📦 Express imported");
import cors from 'cors';
console.log("📦 Cors imported");
import passport from 'passport';
console.log("📦 Passport imported");
import path from 'path';
console.log("📦 Path imported");
import sequelize from './db.js';
console.log("📦 Sequelize/DB imported");

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
        origin: [
            process.env.FRONTEND_URL || "http://localhost:5173",
            "https://hiringplatform-keerthanyus-projects.vercel.app"
        ],
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
        database: "SQLite (Sequelize)",
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
// 🚀 Start Server
// =======================
const PORT = process.env.PORT || 5002;

console.log("🔄 Syncing database...");
sequelize
    .sync({ alter: false }) // ⚠️ DO NOT use alter:true with SQLite
    .then(() => {
        console.log("✅ Database synced successfully");
        console.log(`📡 Attempting to listen on port ${PORT}...`);
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Database sync failed CRITICAL:", err);
        process.exit(1);
    });