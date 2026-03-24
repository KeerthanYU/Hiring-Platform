import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

// Debug logs (remove later)
console.log("CLIENT ID:", process.env.GOOGLE_CLIENT_ID);
console.log("CLIENT SECRET:", process.env.GOOGLE_CLIENT_SECRET);
console.log("CALLBACK URL:", process.env.GOOGLE_CALLBACK_URL);

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

            // ✅ FIX: fallback if ENV missing
            callbackURL:
                process.env.GOOGLE_CALLBACK_URL ||
                "https://hiring-platform-r2ml.onrender.com/api/auth/google/callback",
        },

        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("Google Profile:", profile);

                const email = profile.emails?.[0]?.value;
                const googleId = profile.id;

                if (!email) {
                    throw new Error("No email found in Google profile");
                }

                const ADMIN_EMAIL = "keerthanyu88@gmail.com";
                const targetRole = email === ADMIN_EMAIL ? "admin" : "candidate";

                // ✅ 1️⃣ Find by googleId FIRST
                let user = await User.findOne({ where: { googleId } });

                // ✅ 2️⃣ If not found → find by email
                if (!user) {
                    user = await User.findOne({ where: { email } });
                }

                // ✅ 3️⃣ If still not found → CREATE
                if (!user) {
                    user = await User.create({
                        name: profile.displayName,
                        email,
                        googleId,                // 🔥 IMPORTANT
                        provider: "google",
                        role: targetRole,
                    });
                } else {
                    // ✅ 4️⃣ Update existing user
                    user.googleId = googleId;
                    user.provider = "google";
                    user.role = targetRole;

                    await user.save();
                }

                return done(null, user);

            } catch (err) {
                console.error("GOOGLE AUTH ERROR:", err);
                return done(err, null);
            }
        }
    )
);

export default passport;