import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Application = sequelize.define(
    "Application",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        candidateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        jobId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        recruiterId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        resumeUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        coverNote: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        aiScore: {
            type: DataTypes.FLOAT,
            allowNull: true,
            validate: {
                min: 0,
                max: 100
            }
        },

        aiReason: {
            type: DataTypes.TEXT, // Explanation of the score
            allowNull: true,
        },

        aiFeedback: {
            type: DataTypes.JSON, // Stores { strengths: [], weaknesses: [], skills: [] }
            allowNull: true,
        },

        status: {
            type: DataTypes.ENUM(
                "APPLIED",
                "REVIEWED",
                "SHORTLISTED",
                "REJECTED",
                "HIRED"
            ),
            defaultValue: "APPLIED",
        },
    },
    {
        timestamps: true,
        tableName: "applications",
    }
);

export default Application;
