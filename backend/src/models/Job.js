import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: String,
    description: String,
    skillsRequired: [String],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Job", jobSchema);
