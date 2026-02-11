import sequelize from './src/db.js';
import User from './src/models/User.js';

async function verifyAdmin() {
    try {
        const ADMIN_EMAIL = 'keerthanyu88@gmail.com';
        const user = await User.findOne({ where: { email: ADMIN_EMAIL } });

        if (user) {
            console.log(`✅ User found: ${user.email}`);
            console.log(`Current Role: ${user.role}`);

            if (user.role !== 'admin') {
                user.role = 'admin';
                await user.save();
                console.log('🚀 Role updated to admin successfully');
            } else {
                console.log('✨ Role is already admin');
            }
        } else {
            console.log('ℹ️ User not found in database yet. Role will be enforced upon first login.');
        }
    } catch (error) {
        console.error('❌ Error verifying admin:', error);
    } finally {
        process.exit();
    }
}

verifyAdmin();
