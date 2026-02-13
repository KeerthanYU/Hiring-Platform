import dotenv from 'dotenv';
dotenv.config(); // MUST be first, before any env var usage

import express from 'express';
import cors from 'cors';
import passport from 'passport';
import path from 'path';
import sequelize from './db.js';

// Import passport strategy config (registers the Google OAuth strategy)
import './config/passport.js';

// Import models + associations
import './models/associations.js';

// Routes
import authRoutes from './routes/auth.routes.js';
import googleAuthRoutes from './routes/googleAuth.routes.js';
import userRoutes from './routes/user.routes.js';
import jobRoutes from './routes/job.routes.js';
import applicationRoutes from './routes/application.routes.js';
import adminRoutes from './routes/admin.routes.js';
import notificationRoutes from './routes/notification.routes.js';

const app = express();

// =======================
// 🌐 Global Middleware
// =======================
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
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

// =======================
// 🚀 Start Server
// =======================
const PORT = process.env.PORT || 5002;

sequelize
    .sync({ alter: false }) // ⚠️ DO NOT use alter:true with SQLite
    .then(() => {
        console.log("✅ Database synced");
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Database sync failed:", err);
    });