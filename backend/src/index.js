import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './db.js';
import userRoutes from './routes/userRoutes.js';
import User from './models/User.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

// Sync database and start server
const PORT = process.env.PORT || 5000;
sequelize.sync({ alter: true }).then(() => {
    console.log('✅ Database synced');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
