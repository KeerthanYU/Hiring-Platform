import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Application = sequelize.define('Application', {
    candidateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    jobId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    resumeUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    aiScore: {
        type: DataTypes.FLOAT,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
    },
});

export default Application;
