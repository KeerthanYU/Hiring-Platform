import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    resumeUrl: String,
    aiScore: Number
}, { timestamps: true });

export default mongoose.model("Application", applicationSchema);
