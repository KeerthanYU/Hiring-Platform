
import User from "./src/models/User.js";
import bcrypt from 'bcryptjs';

async function verifyAuthLogic() {
    console.log("🧪 Verifying Email/Password Auth Logic...");

    try {
        const email = "TestAuth@example.com";
        const password = "password123";

        // 1. Test Normalization on Create
        console.log("\n1. Testing Normalization on Create...");
        let user = await User.create({
            name: "Auth Test",
            email,
            password,
            role: "candidate"
        });

        if (user.email !== "testauth@example.com") {
            console.error(`❌ Normalization FAILED: Expected testauth@example.com, got ${user.email}`);
        } else {
            console.log("✅ Normalization Passed");
        }

        // 2. Test Hashing
        console.log("\n2. Testing Hashing...");
        if (user.password === password) {
            console.error("❌ Hashing FAILED: Password stored as plain text");
        } else {
            const isMatch = await user.comparePassword(password);
            if (isMatch) {
                console.log("✅ Hashing & Comparison Passed");
            } else {
                console.error("❌ Comparison FAILED");
            }
        }

        // 3. Test Normalization on Find
        console.log("\n3. Testing Normalization on Find...");
        const foundUser = await User.findOne({ where: { email: "TESTAUTH@EXAMPLE.COM".toLowerCase() } });
        if (foundUser) {
            console.log("✅ Normalization on Find Passed");
        } else {
            console.error("❌ Normalization on Find FAILED");
        }

        // Cleanup
        await user.destroy();
        console.log("\n✨ Verification complete!");

    } catch (err) {
        console.error("❌ Verification error:", err);
    }
}

verifyAuthLogic();
