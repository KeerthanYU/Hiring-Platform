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
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default Job;
