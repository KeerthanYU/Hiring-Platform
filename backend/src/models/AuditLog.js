import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const AuditLog = sequelize.define('AuditLog', {
    adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    action: {
        type: DataTypes.STRING, // e.g., 'SUSPEND_USER', 'APPROVE_RECRUITER'
        allowNull: false,
    },
    targetId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    details: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

export default AuditLog;
