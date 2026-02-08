import bcrypt from 'bcryptjs';
import User from './models/User.js';
import sequelize from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const seedAdmin = async () => {
    try {
        await sequelize.sync(); // Ensure tables exist

        const adminEmail = process.env.ADMIN_EMAIL || 'admin@hiringplatform.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';

        const existingAdmin = await User.findOne({ where: { role: 'admin' } });
        if (existingAdmin) {
            console.log('⚠️ Admin user already exists. Skipping seeding.');
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        await User.create({
            name: 'System Admin',
            email: adminEmail,
            password: hashedPassword,
            role: 'admin',
            accountStatus: 'active',
        });

        console.log('✅ Admin user created successfully!');
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
