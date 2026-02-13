import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// 1️⃣ Redirect user to Google
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

// 2️⃣ Google callback
router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
        try {
            const token = jwt.sign(
                {
                    id: req.user.id,
                    email: req.user.email,
                    role: req.user.role,
                    name: req.user.name
                },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
            );

            // Redirect to frontend with token and user info
            const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
            const redirectUrl = new URL(`${frontendUrl}/auth/success`);
            redirectUrl.searchParams.append("token", token);

            res.redirect(redirectUrl.toString());
        } catch (error) {
            console.error("❌ Google Auth Callback Error:", error);
            res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
        }
    }
);

export default router;
