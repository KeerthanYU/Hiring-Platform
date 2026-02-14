import Job from "../models/Job.js";
import User from "../models/User.js";
import { Op } from "sequelize";

export const createJob = async (req, res) => {
    try {
        const { title, description, company, location, salary, skills, requirements, experience, jobType } = req.body;

        const dbUser = await User.findByPk(req.user.id);
        if (!dbUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (dbUser.role === 'recruiter' && !dbUser.isVerifiedRecruiter) {
            return res.status(403).json({ message: "Your account is pending approval by an admin." });
        }

        const job = await Job.create({
            title,
            description,
            company,
            location,
            salary,
            skills,
            requirements,
            experience,
            jobType,
            status: 'active',
            createdBy: req.user.id
        });

        res.status(201).json(job);
    } catch (err) {
        console.error("Create job error:", err);
        res.status(500).json({ error: err.message || "Failed to create job" });
    }
};

export const getJobById = async (req, res) => {
    try {
        const job = await Job.findByPk(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.json(job);
    } catch (err) {
        console.error("Get job error:", err);
        res.status(500).json({ error: err.message || "Failed to fetch job details" });
    }
};

export const getJobs = async (req, res) => {
    try {
        const queryOptions = {
            where: {},
            order: [['createdAt', 'DESC']]
        };

        // Candidates only see 'active' jobs or jobs with no status (defensive check)
        if (!req.user || req.user.role === 'candidate') {
            queryOptions.where = {
                ...queryOptions.where,
                [Op.or]: [
                    { status: 'active' },
                    { status: null }
                ]
            };
        }

        if (req.user && req.user.role === "recruiter") {
            queryOptions.where.createdBy = req.user.id;
        }

        const jobs = await Job.findAll(queryOptions);
        res.json(jobs);
    } catch (err) {
        console.error("❌ [DATABASE_ERROR] Error fetching jobs from SQLite:", {
            message: err.message,
            sql: err.sql,
            parameters: err.parameters,
            stack: err.stack
        });
        res.status(500).json({
            error: "Database error occurred while fetching job listings.",
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};
