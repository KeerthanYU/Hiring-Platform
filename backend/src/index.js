import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import sequelize from "./db.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import googleAuthRoutes from "./routes/googleAuth.routes.js";
import jobRoutes from "./routes/job.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";

// Passport
import passport from "./config/passport.js";

// Models (important for sync)
import User from "./models/User.js";
import Application from "./models/Application.js";
import AuditLog from "./models/AuditLog.js";

dotenv.config();

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
app.use("/api/applications", applicationRoutes); // ✅ ONLY ONCE
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// =======================
// 🚀 Start Server
// =======================
const PORT = process.env.PORT || 5002;

sequelize
    .sync() // ⚠️ DO NOT use alter:true with SQLite
    .then(() => {
        console.log("✅ Database synced");
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Database sync failed:", err);
    });
