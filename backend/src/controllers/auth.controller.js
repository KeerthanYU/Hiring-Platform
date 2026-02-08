import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register Controller
export const register = async (req, res) => {
    try {
        console.log("📝 Register attempt:", req.body.email);

        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ message: "Name, email, and password are required" });
        }

        // Prevent privilege escalation
        const allowedRoles = ["candidate", "recruiter"];
        const safeRole = allowedRoles.includes(role) ? role : "candidate";

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashed,
            role: safeRole,
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        console.error("❌ Registration error:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error during registration",
        });
    }
};

// Login Controller
export const login = async (req, res) => {
    try {
        console.log("🔑 Login attempt:", req.body.email);

        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ success: false, message: "Email and password required" });
        }

        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid credentials" });
        }

        if (user.accountStatus === 'suspended') {
            return res
                .status(403)
                .json({ success: false, message: "Your account has been suspended. Please contact support." });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                accountStatus: user.accountStatus,
                isVerifiedRecruiter: user.isVerifiedRecruiter,
            },
        });
    } catch (err) {
        console.error("❌ Login error:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error during login",
        });
    }
};

// Token validation / session restore
export const me = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ["id", "name", "email", "role"],
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ success: true, user });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch user" });
    }
};
