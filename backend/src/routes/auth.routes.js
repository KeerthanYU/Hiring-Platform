import express from "express";
import passport from "passport";
import { register, login, me } from "../controllers/auth.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, me);

// Google Login
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Callback
router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
        res.redirect("https://hiringplatform-keerthanyus-projects.vercel.app/dashboard");
    }
);

export default router;