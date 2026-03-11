import { Sequelize } from "sequelize";

const DB_URL = "postgresql://ai_hiring_db_tbip_user:h8R6CgYU7QMgYPyYdsiPKXE9YsrewHZ6@dpg-d6onl824d50c73bljthg-a/ai_hiring_db_tbip";

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
