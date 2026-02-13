import Job from "../models/Job.js";
import User from "../models/User.js";

export const createJob = async (req, res) => {
    try {
        const { title, description, company, location, salary } = req.body;

        // Fetch full user from DB to check isVerifiedRecruiter
        // (req.user only has JWT payload: id, email, role)
        const dbUser = await User.findByPk(req.user.id);
        if (!dbUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if recruiter is approved
        if (dbUser.role === 'recruiter' && !dbUser.isVerifiedRecruiter) {
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

        res.status(201).json(job);
    } catch (err) {
        console.error("Create job error:", err);
        res.status(500).json({ error: err.message });
    }
};


export const getJobs = async (req, res) => {
    try {
        const queryOptions = {
            order: [['createdAt', 'DESC']]
        };

        // If recruiter, only show their own jobs
        if (req.user && req.user.role === 'recruiter') {
            queryOptions.where = { createdBy: req.user.id };
        }

        const jobs = await Job.findAll(queryOptions);
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
