import User from '../models/User.js';
import AuditLog from '../models/AuditLog.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';

// View all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json({ success: true, users });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch users" });
    }
};
export const updateUserRole = async (req, res) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;

        const allowedRoles = ['admin', 'recruiter', 'candidate'];

        if (!allowedRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = role;
        await user.save();

        res.json({
            message: 'Role updated successfully',
            user: {
                id: user.id,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update role' });
    }
};

// Update user status (Suspend/Block/Activate)
export const updateUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.accountStatus = status;
        await user.save();

        await AuditLog.create({
            adminId: req.user.id,
            action: 'UPDATE_USER_STATUS',
            targetId: id,
            details: `Updated status to ${status}`
        });

        res.json({ success: true, message: `User status updated to ${status}` });
    } catch (err) {
        res.status(500).json({ message: "Failed to update user status" });
    }
};

// Approve Recruiter
export const approveRecruiter = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user || user.role !== 'recruiter') {
            return res.status(404).json({ message: "Recruiter not found" });
        }

        user.isVerifiedRecruiter = true;
        await user.save();

        await AuditLog.create({
            adminId: req.user.id,
            action: 'APPROVE_RECRUITER',
            targetId: id,
            details: 'Recruiter approved for job posting'
        });

        res.json({ success: true, message: "Recruiter approved successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to approve recruiter" });
    }
};

// Get Platform Metrics
export const getPlatformMetrics = async (req, res) => {
    try {
        const totalUsers = await User.count();
        const totalJobs = await Job.count();
        const totalApplications = await Application.count();
        const pendingRecruiters = await User.count({ where: { role: 'recruiter', isVerifiedRecruiter: false } });

        res.json({
            success: true,
            metrics: {
                totalUsers,
                totalJobs,
                totalApplications,
                pendingRecruiters
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch metrics" });
    }
};
export const getAdminAnalytics = async (req, res) => {
    try {
        const [users, jobs, applications] = await Promise.all([
            User.count(),
            Job.count(),
            Application.count()
        ]);

        res.json({
            totalUsers: users,
            totalJobs: jobs,
            totalApplications: applications
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to load analytics' });
    }
};
// View Audit Logs
export const getAuditLogs = async (req, res) => {
    try {
        const logs = await AuditLog.findAll({
            order: [['timestamp', 'DESC']],
            include: [{ model: User, as: 'admin', attributes: ['name', 'email'] }]
        });
        res.json({ success: true, logs });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch audit logs" });
    }
};
// View all applications (Admin only)
export const getAdminApplications = async (req, res) => {
    try {
        console.log(`[ADMIN] Fetching all applications. Admin ID: ${req.user.id}`);
        const applications = await Application.findAll({
            include: [
                {
                    model: Job,
                    as: "job",
                    attributes: ["title", "company"],
                },
                {
                    model: User,
                    as: "candidate",
                    attributes: ["name", "email"],
                },
                {
                    model: User,
                    as: "recruiter",
                    attributes: ["name", "email"],
                }
            ],
            order: [["createdAt", "DESC"]],
        });

        console.log(`[ADMIN] Found ${applications.length} applications.`);
        res.json({ success: true, applications });
    } catch (err) {
        console.error("[ADMIN] Failed to fetch applications:", err);
        res.status(500).json({ message: "Failed to fetch all applications" });
    }
};
