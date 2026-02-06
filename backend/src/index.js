import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './db.js';
import authRoutes from './routes/auth.routes.js';
import jobRoutes from './routes/job.routes.js';
import applicationRoutes from './routes/application.routes.js';
import userRoutes from './routes/user.routes.js';

// Models for syncing
import User from './models/User.js';
import Job from './models/Job.js';
import Application from './models/Application.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.json({
        message: "Hiring Platform Backend API is running",
        status: "Online",
        database: "SQLite (Sequelize)"
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/users', userRoutes);

// Sync database and start server
const PORT = process.env.PORT || 5001;
sequelize.sync({ alter: true }).then(() => {
    console.log('✅ Database synced');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch(err => {
    console.error('❌ Database sync failed:', err);
});
