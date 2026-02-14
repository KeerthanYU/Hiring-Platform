import express from 'express';
import {
    getAllUsers,
    updateUserStatus,
    approveRecruiter,
    getPlatformMetrics,
    getAuditLogs,
    getAdminAnalytics,
    getAdminApplications
} from '../controllers/admin.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

// All routes require login and 'admin' role
router.use(authMiddleware, roleMiddleware('admin'));

router.get('/users', getAllUsers);
router.patch('/users/:id/status', updateUserStatus);
router.patch('/recruiters/:id/approve', approveRecruiter);
router.get('/metrics', getPlatformMetrics);
router.get('/audit-logs', getAuditLogs);
router.get('/analytics', getAdminAnalytics);
router.get('/applications', getAdminApplications);
export default router;
