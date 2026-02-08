import { useState } from "react";
import { applyJob } from "./api/applications";

export default function ApplyJob({ jobId }) {
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleApply = async () => {
        console.log("Apply button clicked");
        console.log("Job ID:", jobId);
        console.log("Resume file:", resume);

        if (!resume) {
            alert("Please upload your resume");
            return;
        }

        if (!jobId) {
            console.error("Job ID is missing!");
            alert("Error: Job ID is missing.");
            return;
        }

        try {
            setLoading(true);
            console.log("Calling applyJob API...");
            await applyJob(jobId, resume);
            console.log("Application successful");
            alert("Application submitted successfully");
        } catch (err) {
            console.error("Apply failed:", err);
            alert(err.response?.data?.message || err.message || "Apply failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                    console.log("File selected:", e.target.files[0]);
                    setResume(e.target.files[0]);
                }}
            />

            <button type="button" onClick={handleApply} disabled={loading}>
                {loading ? "Applying..." : "Apply"}
            </button>
        </div>
    );
}
