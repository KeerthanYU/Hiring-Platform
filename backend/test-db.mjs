import sequelize from './src/db.js';
import './src/models/associations.js';

console.log("🚦 Starting DB Test...");

try {
    console.log("🔄 Authenticating...");
    await sequelize.authenticate();
    console.log("✅ Authenticated");

    console.log("🔄 Syncing...");
    await sequelize.sync({ alter: false });
    console.log("✅ Synced");

    process.exit(0);
} catch (err) {
    console.error("❌ DB Test Failed:", err);
    process.exit(1);
}
