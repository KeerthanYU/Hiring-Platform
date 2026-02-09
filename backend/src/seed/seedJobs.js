
import Job from '../models/Job.js';
import User from '../models/User.js';
import sequelize from '../db.js';

const seedJobs = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ SQL Connected for seeding jobs');

        // Find a recruiter to assign the job to
        const recruiter = await User.findOne({ where: { role: 'recruiter' } });
        let recruiterId = 1; // Default fallback

        if (recruiter) {
            recruiterId = recruiter.id;
            console.log(`Found Recruiter: ${recruiter.email} (ID: ${recruiterId})`);
        } else {
            // Create a dummy recruiter if none exists, to avoid FK errors if strict
            console.log('No recruiter found, using ID 1 or creating dummy if needed logic here (skipping for now, assuming ID 1 works or DB is lenient)');
            // For SQLite with typical setup, if we just need a number, we can try 1. 
            // Ideally we should find ANY user or created one. 
            // Let's checks if User 1 exists.
            const user1 = await User.findByPk(1);
            if (!user1) {
                console.log("Creating temporary recruiter for valid FK...");
                const newRecruiter = await User.create({
                    name: 'Test Recruiter',
                    email: 'recruiter@test.com',
                    password: 'hashedpassword', // dummy
                    role: 'recruiter',
                    accountStatus: 'active'
                });
                recruiterId = newRecruiter.id;
            } else {
                recruiterId = user1.id;
            }
        }

        // Check if Job 1 exists
        const existingJob = await Job.findByPk(1);
        if (existingJob) {
            console.log('⚠️ Job 1 already exists. Skipping.');
        } else {
            const job = await Job.create({
                id: 1, // Force ID 1 to match user's request
                title: 'Senior Node.js Engineer',
                description: 'We are looking for a backend expert...',
                company: 'Tech Corp',
                location: 'Remote',
                salary: '$120k - $150k',
                createdBy: recruiterId, // This maps to recruiterId in many schemas, or createdBy
            });
            console.log('✅ Job 1 created successfully:', job.title);
        }

    } catch (error) {
        console.error('❌ Error seeding jobs:', error);
    } finally {
        await sequelize.close();
    }
};

seedJobs();
