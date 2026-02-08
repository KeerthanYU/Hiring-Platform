import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Notification = sequelize.define(
    "Notification",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM("APPLICATION", "SYSTEM", "MESSAGE"),
            defaultValue: "SYSTEM",
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        relatedId: {
            type: DataTypes.INTEGER, // e.g., Application ID
            allowNull: true,
        },
    },
    {
        timestamps: true,
        tableName: "notifications",
    }
);

export default Notification;
