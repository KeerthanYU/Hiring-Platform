import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register Controller
export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Name, email, and password are required" });
        }

        const normalizedEmail = email.toLowerCase();
        console.log("📝 Register attempt for:", normalizedEmail);

        const existingUser = await User.findOne({ where: { email: normalizedEmail } });
        if (existingUser) {
            console.warn("⚠️ Registration failed: User already exists -", normalizedEmail);
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Prevent unauthorized admin creation
        const allowedRoles = ["candidate", "recruiter"];
        const safeRole = allowedRoles.includes(role) ? role : "candidate";

        // Password hashing handled by User model hooks
        const user = await User.create({
            name,
            email: normalizedEmail,
            password,
            role: safeRole,
        });

        console.log("✅ User registered successfully:", normalizedEmail);

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
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password required" });
        }

        const normalizedEmail = email.toLowerCase();
        console.log("🔑 Login attempt for:", normalizedEmail);

        const user = await User.findOne({ where: { email: normalizedEmail } });

        if (!user) {
            console.warn("⚠️ Login failed: User not found -", normalizedEmail);
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Handle OAuth users vs Local users
        if (user.provider === "google" && !user.password) {
            return res.status(401).json({
                success: false,
                message: "This account uses Google Login. Please sign in with Google."
            });
        }

        // Use instance method for password comparison
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.warn("⚠️ Login failed: Password mismatch -", normalizedEmail);
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        if (user.accountStatus === 'suspended') {
            console.warn("⚠️ Login failed: Account suspended -", normalizedEmail);
            return res.status(403).json({ success: false, message: "Your account has been suspended." });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
        );

        console.log("✅ Login successful:", normalizedEmail);

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
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user });
    } catch (err) {
        console.error("❌ Error fetching user info:", err);
        res.status(500).json({ success: false, message: "Failed to fetch user" });
    }
};
