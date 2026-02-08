import bcrypt from 'bcrypt';
import User from '../models/User.js';

const seedAdmin = async () => {
    const email = 'keerthanyu88@gmail.com';

    const existing = await User.findOne({ where: { email } });
    if (existing) return console.log('Admin already exists');

    await User.create({
        name: 'Keerthan Y U',
        email,
        password: await bcrypt.hash('keerthu@2006', 10),
        role: 'ADMIN',
        isActive: true
    });

    console.log('Admin created');
};

seedAdmin();
