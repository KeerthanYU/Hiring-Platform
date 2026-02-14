import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Database instance
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.NODE_ENV === 'test' ? './database_test.sqlite' : './database.sqlite',
    logging: false,
    dialectOptions: {
        // Fix SQLITE_BUSY: database is locked
        // mode: 'WAL', // Temporarily disabled due to env hang
        busyTimeout: 5000 // 5 seconds
    },
    // Ensure single pool configuration if needed, though default is usually fine for SQLite
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// Authenticate on startup (optional, as sync() will also connect)
// We'll export the instance directly
export default sequelize;
