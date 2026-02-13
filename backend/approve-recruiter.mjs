import User from './src/models/User.js';
import sequelize from './src/db.js';

async function approveRecruiter() {
    try {
        console.log("🚦 Manually approving test recruiter...");
        const user = await User.findOne({ where: { email: 'test_recruiter@example.com' } });
        if (user) {
            user.isVerifiedRecruiter = true;
            await user.save();
            console.log("✅ Recruiter approved!");
        } else {
            console.log("❌ Recruiter not found.");
        }
        process.exit(0);
    } catch (err) {
        console.error("❌ Approval failed:", err);
        process.exit(1);
    }
}

approveRecruiter();
