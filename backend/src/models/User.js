import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import bcrypt from 'bcryptjs';

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
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
}, {
    hooks: {
        beforeSave: async (user) => {
            if (user.email) {
                user.email = user.email.toLowerCase();
            }
            if (user.password && user.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    }
});

// Instance method to compare passwords
User.prototype.comparePassword = async function (enteredPassword) {
    if (!this.password) return false;
    return await bcrypt.compare(enteredPassword, this.password);
};

export default User;
