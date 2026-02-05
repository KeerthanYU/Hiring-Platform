import mongoose from "mongoose";

/**
 * Connect to MongoDB with retry logic and robust error handling.
 * This implementation specifically addresses SRV resolution issues common on Windows/restricted networks.
 */
const connectDB = async (retryCount = 0) => {
    const MAX_RETRIES = 5;
    const RETRY_DELAY = Math.min(5000 * Math.pow(2, retryCount), 30000); // Exponential backoff capped at 30s

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // These options ensure better stability on flaky networks
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error("❌ MongoDB Connection Error:");
        console.error(`   Message: ${err.message}`);

        if (err.message.includes("querySrv ECONNREFUSED")) {
            console.error("   Potential Cause: DNS/SRV records are blocked by your network or ISP.");
            console.error("   Action: Try the 'Standard Connection String' (mongodb://) instead of 'mongodb+srv://'.");
        }

        if (retryCount < MAX_RETRIES) {
            console.log(`🔄 Retrying connection in ${RETRY_DELAY / 1000}s... (Attempt ${retryCount + 1}/${MAX_RETRIES})`);
            setTimeout(() => connectDB(retryCount + 1), RETRY_DELAY);
        } else {
            console.error("🚨 Critical: Max retries reached. Exiting...");
            process.exit(1);
        }
    }
};

export default connectDB;
