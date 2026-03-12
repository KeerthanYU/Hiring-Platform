import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import { Sequelize, DataTypes } from "sequelize";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

const PORT = process.env.PORT || 5002;

/* ---------------- DATABASE CONNECTION ---------------- */

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

/* ---------------- USER MODEL ---------------- */

const User = sequelize.define("User", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

/* ---------------- DATABASE INIT ---------------- */

(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ PostgreSQL connected");

        await sequelize.sync();
        console.log("✅ Database synced");
    } catch (error) {
        console.error("❌ Database error:", error);
    }
})();

/* ---------------- ROOT ROUTE ---------------- */

app.get("/", (req, res) => {
    res.json({
        message: "SkillTest AI API is running",
        version: "1.0.0"
    });
});

/* ---------------- REGISTER ---------------- */

app.post("/api/register", async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {

        if (err.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server error during registration"
        });
    }
});

/* ---------------- LOGIN ---------------- */

app.post("/api/login", async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });
    }

    try {

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: "Server error during login"
        });

    }
});

/* ---------------- 404 HANDLER ---------------- */

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

/* ---------------- GLOBAL ERROR ---------------- */

app.use((err, req, res, next) => {
    console.error("🔥 Global Error:", err);

    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
});

/* ---------------- START SERVER ---------------- */

app.listen(PORT, () => {
    console.log(`🚀 SkillTest AI Backend running on port ${PORT}`);
});