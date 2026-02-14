import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';
import sequelize from '../db.js';
import User from '../models/User.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import '../models/associations.js';
import applicationRoutes from '../routes/application.routes.js';
import adminRoutes from '../routes/admin.routes.js';

const app = express();
app.use(express.json());
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);

const JWT_SECRET = process.env.JWT_SECRET || 'test_secret';

const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET);
};

describe('Application Visibility & Access Control', () => {
    let admin, recruiter1, recruiter2, candidate1, candidate2;
    let job1, job2, job3;
    let tokenAdmin, tokenRecruiter1, tokenRecruiter2, tokenCandidate1, tokenCandidate2;

    beforeAll(async () => {
        // Force sync for test DB
        await sequelize.sync({ force: true });

        // Seed Users
        admin = await User.create({ name: 'Admin', email: 'admin@test.com', password: 'password123', role: 'admin' });
        recruiter1 = await User.create({ name: 'Recruiter 1', email: 'r1@test.com', password: 'password123', role: 'recruiter' });
        recruiter2 = await User.create({ name: 'Recruiter 2', email: 'r2@test.com', password: 'password123', role: 'recruiter' });
        candidate1 = await User.create({ name: 'Candidate 1', email: 'c1@test.com', password: 'password123', role: 'candidate' });
        candidate2 = await User.create({ name: 'Candidate 2', email: 'c2@test.com', password: 'password123', role: 'candidate' });

        tokenAdmin = generateToken(admin);
        tokenRecruiter1 = generateToken(recruiter1);
        tokenRecruiter2 = generateToken(recruiter2);
        tokenCandidate1 = generateToken(candidate1);
        tokenCandidate2 = generateToken(candidate2);

        // Seed Jobs
        job1 = await Job.create({ title: 'Full Stack Dev', description: 'desc', company: 'ABC', location: 'Remote', createdBy: recruiter1.id });
        job2 = await Job.create({ title: 'Frontend Dev', description: 'desc', company: 'ABC', location: 'Remote', createdBy: recruiter1.id });
        job3 = await Job.create({ title: 'Backend Dev', description: 'desc', company: 'XYZ', location: 'Remote', createdBy: recruiter2.id });

        // Seed Applications
        // Candidate 1 applies to Job 1 (Recruiter 1)
        await Application.create({
            candidateId: candidate1.id,
            jobId: job1.id,
            recruiterId: recruiter1.id,
            resumeUrl: 'res1.pdf',
            aiScore: 85,
            status: 'APPLIED'
        });
        // Candidate 2 applies to Job 2 (Recruiter 1)
        await Application.create({
            candidateId: candidate2.id,
            jobId: job2.id,
            recruiterId: recruiter1.id,
            resumeUrl: 'res2.pdf',
            aiScore: 70,
            status: 'APPLIED'
        });
        // Candidate 1 applies to Job 3 (Recruiter 2)
        await Application.create({
            candidateId: candidate1.id,
            jobId: job3.id,
            recruiterId: recruiter2.id,
            resumeUrl: 'res3.pdf',
            aiScore: 90,
            status: 'APPLIED'
        });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    test('Recruiter 1 should see exactly 2 applications for their jobs', async () => {
        const res = await request(app)
            .get('/api/applications/recruiter')
            .set('Authorization', `Bearer ${tokenRecruiter1}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(2);
        expect(res.body.every(a => a.recruiterId === recruiter1.id)).toBe(true);
    });

    test('Recruiter 2 should see exactly 1 application for their job', async () => {
        const res = await request(app)
            .get('/api/applications/recruiter')
            .set('Authorization', `Bearer ${tokenRecruiter2}`);

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].recruiterId).toBe(recruiter2.id);
    });

    test('Admin should see ALL 3 applications', async () => {
        const res = await request(app)
            .get('/api/admin/applications')
            .set('Authorization', `Bearer ${tokenAdmin}`);

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.applications.length).toBe(3);
    });

    test('Candidate should NOT be able to access recruiter applications', async () => {
        const res = await request(app)
            .get('/api/applications/recruiter')
            .set('Authorization', `Bearer ${tokenCandidate1}`);

        expect(res.status).toBe(403);
    });

    test('Recruiter should NOT be able to access admin applications', async () => {
        const res = await request(app)
            .get('/api/admin/applications')
            .set('Authorization', `Bearer ${tokenRecruiter1}`);

        expect(res.status).toBe(403);
    });

    test('Candidate should see only their own application status', async () => {
        const res = await request(app)
            .get('/api/applications/candidate')
            .set('Authorization', `Bearer ${tokenCandidate2}`);

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].candidateId).toBe(candidate2.id);
    });
});
