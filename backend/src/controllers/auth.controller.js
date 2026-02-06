import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register Controller
export const register = async (req, res) => {
    try {
        console.log("📝 Register attempt:", req.body.email);

        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            console.log("⚠️ Registration failed: User already exists", email);
            return res.status(400).json({ message: "User already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashed,
            role: role || 'candidate'
        });

        console.log("✅ User created successfully:", user.id);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        console.error("❌ Registration error:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error during registration",
            error: err.message
        });
    }
};

// Login Controller
export const login = async (req, res) => {
    try {
        console.log("🔑 Login attempt:", req.body.email);

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password required" });
        }

        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            console.log("⚠️ Login failed: Invalid credentials for", email);
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        console.log("✅ Login success:", user.id);

        res.json({
            success: true,
            message: "Login successful",
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        console.error("❌ Login error:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error during login",
            error: err.message
        });
    }
};
