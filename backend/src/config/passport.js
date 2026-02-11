import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js"; // Direct import from User.js

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;
                const ADMIN_EMAIL = "keerthanyu88@gmail.com";
                const targetRole = email === ADMIN_EMAIL ? "admin" : "candidate";

                let user = await User.findOne({ where: { email } });

                if (!user) {
                    // 1️⃣ Create new user with correct role
                    user = await User.create({
                        name: profile.displayName,
                        email,
                        provider: "google",
                        role: targetRole,
                    });
                } else {
                    // 2️⃣ Ensure existing user has the correct role (Force Admin)
                    if (user.role !== targetRole) {
                        user.role = targetRole;
                        await user.save();
                    }
                }

                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

export default passport;
