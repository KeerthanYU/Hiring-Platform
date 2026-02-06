import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const app = express();
app.use(cors({ origin: "*" })); // Allow all for development, can be restricted later
app.use(express.json());

const PORT = 5002;

// Root route to prevent "Unexpected token '<'" errors when hitting /
app.get("/", (req, res) => {
    res.json({ message: "SkillTest AI API is running", version: "1.0.0" });
});

// Initialize SQLite database
let db;
(async () => {
    db = await open({
        filename: "./database.db",
        driver: sqlite3.Database,
    });

    await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    )
  `);
})();

// -------- REGISTER ENDPOINT --------
app.post("/api/register", async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        await db.run(
            "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, role]
        );

        res.json({ success: true, message: "User registered successfully" });
    } catch (err) {
        if (err.message.includes("UNIQUE constraint")) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }
        res.status(500).json({ success: false, message: "Server error during registration" });
    }
});

// -------- LOGIN ENDPOINT --------
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ success: false, message: "Email and password are required" });

    try {
        const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);

        if (!user)
            return res.status(400).json({ success: false, message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ success: false, message: "Invalid email or password" });

        // Return user data (remove password)
        const { password: pwd, ...userData } = user;
        res.json({ success: true, user: userData });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error during login" });
    }
});

// Custom 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("🔥 Global Error:", err);
    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
app.listen(PORT, () => console.log(`🚀 SkillTest AI Backend running on http://localhost:${PORT}`));
