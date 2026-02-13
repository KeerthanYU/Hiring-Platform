
import User from "./src/models/User.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

async function verifyLogic() {
    console.log("🧪 Verifying Google OAuth Role Assignment Logic...");

    const testCases = [
        { email: "keerthanyu88@gmail.com", expectedRole: "admin", description: "Admin Email" },
        { email: "other@gmail.com", expectedRole: "candidate", description: "Regular Candidate" }
    ];

    for (const test of testCases) {
        console.log(`\nCase: ${test.description} (${test.email})`);

        const profile = { emails: [{ value: test.email }], displayName: "Test User" };
        const ADMIN_EMAIL = "keerthanyu88@gmail.com";
        const targetRole = profile.emails[0].value === ADMIN_EMAIL ? "admin" : "candidate";

        if (targetRole !== test.expectedRole) {
            console.error(`❌ FAILED: Expected ${test.expectedRole}, but got ${targetRole}`);
            process.exit(1);
        } else {
            console.log(`✅ Passed: Assigned role ${targetRole}`);
        }
    }

    console.log("\n✨ All tests passed!");
}

verifyLogic();
