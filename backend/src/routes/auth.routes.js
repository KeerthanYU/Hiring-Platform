import express from "express";
import { register, login, me } from "../controllers/auth.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, me);

router.get("/register", (req, res) => {
    res.send("Registration API is live. Use POST to register users.");
});

export default router;
