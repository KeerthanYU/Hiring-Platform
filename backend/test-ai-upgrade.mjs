const API_URL = 'http://localhost:5002/api';

async function runVerification() {
    console.log("🚀 Starting AI Upgrade Verification (with Auto-Approve)...");

    const recruiterEmail = `recruiter_${Date.now()}@test.com`;
    const candidateEmail = `candidate_${Date.now()}@test.com`;
    const password = 'password123';

    try {
        // 1. Register Recruiter
        console.log("\n--- Registering Recruiter ---");
        const regRecRes = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Test Recruiter', email: recruiterEmail, password, role: 'recruiter' })
        });
        const regRecData = await regRecRes.json();
        console.log("✅ Recruiter Registered");

        // 2. Auto-Approve Recruiter in DB
        console.log("\n--- Auto-Approving Recruiter ---");
        // We'll use a small script to update the DB directly
        const { execSync } = await import('child_process');
        const approveCmd = `node -e "import('./src/models/User.js').then(m => m.default.update({ isVerifiedRecruiter: true }, { where: { email: '${recruiterEmail}' } })).then(() => process.exit(0))"`;
        execSync(approveCmd);
        console.log("✅ Recruiter Approved in Database");

        // 3. Login Recruiter
        console.log("\n--- Logging in Recruiter ---");
        const loginRes = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: recruiterEmail, password })
        });
        const loginData = await loginRes.json();
        const token = loginData.token;
        if (!token) throw new Error("Recruiter login failed");
        console.log("✅ Recruiter Logged In");

        // 4. Create Job with Skills
        console.log("\n--- Creating Job with Skills ---");
        const jobRes = await fetch(`${API_URL}/jobs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: "Expert AI Engineer",
                description: "We need a PhD in AI.",
                company: "Google DeepMind",
                location: "London",
                salary: "$250k",
                skills: "Python, TensorFlow, PyTorch, Research, PhD"
            })
        });
        if (!jobRes.ok) {
            const err = await jobRes.json();
            throw new Error(`Job creation failed: ${err.message || err.error}`);
        }
        const job = await jobRes.json();
        console.log("✅ Job Created, ID:", job.id);

        // 5. Register Candidate
        console.log("\n--- Registering Candidate ---");
        await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'AI Researcher', email: candidateEmail, password, role: 'candidate' })
        });
        console.log("✅ Candidate Registered");

        // 6. Login Candidate
        console.log("\n--- Logging in Candidate ---");
        const candLoginRes = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: candidateEmail, password })
        });
        const candLoginData = await candLoginRes.json();
        const candToken = candLoginData.token;
        console.log("✅ Candidate Logged In");

        // 7. Apply for Job
        console.log("\n--- Applying for Job (High Match) ---");
        const formData = new FormData();
        formData.append('jobId', job.id);
        formData.append('coverNote', 'I have a PhD and experience in PyTorch and Research.');

        const blob = new Blob(['%PDF-1.4 simulated resume with PhD and PyTorch'], { type: 'application/pdf' });
        formData.append('resume', blob, 'AI_Researcher_PhD_PyTorch.pdf');

        const applyRes = await fetch(`${API_URL}/applications/apply`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${candToken}` },
            body: formData
        });
        const applyData = await applyRes.json();
        console.log("✅ Application Response:", applyData.message);

        // 8. Verify Recruiter List
        console.log("\n--- Verifying Recruiter List ---");
        const listRes = await fetch(`${API_URL}/applications/recruiter`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const applications = await listRes.json();

        const latestApp = applications.find(a => a.jobId === job.id);
        if (latestApp) {
            console.log("✅ SUCCESS: Found application!");
            console.log("   AI Score:", latestApp.aiScore);
            console.log("   AI Reason:", latestApp.aiReason);

            if (latestApp.aiScore > 60) {
                console.log("✅ Score verification passed!");
            } else {
                console.log("⚠️ Score lower than expected:", latestApp.aiScore);
            }
        } else {
            console.log("❌ FAILED: Application not found.");
        }
    } catch (err) {
        console.error("❌ Verification Error:", err.message);
    }
}

runVerification();
