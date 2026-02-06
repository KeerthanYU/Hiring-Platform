import Job from "../models/Job.js";

export const createJob = async (req, res) => {
    try {
        const job = await Job.create({
            ...req.body,
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
