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
        const token = jwt.sign(
            {
                id: req.user.id,
                email: req.user.email,
                role: req.user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.redirect(
            `${process.env.FRONTEND_URL}/auth/success?token=${token}&role=${req.user.role}`
        );
    }
);

export default router;
