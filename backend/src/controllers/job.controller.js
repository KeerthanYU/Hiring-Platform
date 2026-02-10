import Job from "../models/Job.js";

export const createJob = async (req, res) => {
    try {
        const { title, description, company, location, salary } = req.body;
        console.log("JOB CREATED BY:", req.user.id);

        // Check if recruiter is approved
        if (req.user.role === 'recruiter' && !req.user.isVerifiedRecruiter) {
            return res.status(403).json({ message: "Your account is pending approval by an admin." });
        }

        const job = await Job.create({
            title,
            description,
            company,
            location,
            salary,
            createdBy: req.user.id
        });
        res.json(job);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.findAll();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
