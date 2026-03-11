import { Sequelize } from "sequelize";

const DB_URL = process.env.DATABASE_URL;

const sequelize = new Sequelize(DB_URL, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Allow self-signed certificates (common in production/Render)
        }
    }
});

export default sequelize;
