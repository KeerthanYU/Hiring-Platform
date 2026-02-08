import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    provider: {
        type: DataTypes.STRING,
        defaultValue: 'local', // local | google
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'candidate', // candidate | recruiter | admin
    },
    accountStatus: {
        type: DataTypes.STRING,
        defaultValue: 'active', // active | suspended | pending
    },
    isVerifiedRecruiter: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

export default User;
