import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Job = sequelize.define('Job', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    salary: {
        type: DataTypes.STRING,
    },
    skills: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    requirements: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    experience: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    jobType: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default Job;
