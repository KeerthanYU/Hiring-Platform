import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // SQLite database file
    logging: false, // optional: disable logging
});

try {
    await sequelize.authenticate();
    console.log('✅ SQL (SQLite) connected successfully');
} catch (err) {
    console.error('❌ SQL connection error:', err);
}

export default sequelize;
