export const applyJob = async (jobId, resumeFile) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Please login first");
    }

    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("resume", resumeFile);

    const res = await fetch(
        "http://localhost:5002/api/applications/apply",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to apply");
    }

    return data;
};
