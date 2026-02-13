const API_URL = 'http://localhost:5002/api';

async function verifyWorkflow() {
    console.log('🚀 Starting Workflow Verification (Node 22 Native)...');

    try {
        // 1. Register Recruiter
        console.log('\n--- Registering Recruiter ---');
        let recruiterToken;
        try {
            const regRecResponse = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'Test Recruiter',
                    email: 'test_recruiter@example.com',
                    password: 'Password123!',
                    role: 'recruiter'
                })
            });
            const regData = await regRecResponse.json();
            console.log('✅ Recruiter Register Response:', regData.message || regData.error || regRecResponse.status);
        } catch (err) {
            console.log('ℹ️ Recruiter registration note:', err.message);
        }

        // 2. Login Recruiter
        const logRecResponse = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'test_recruiter@example.com',
                password: 'Password123!'
            })
        });
        const recData = await logRecResponse.json();
        recruiterToken = recData.token;
        console.log('✅ Recruiter Logged In');

        // 3. Register Candidate
        console.log('\n--- Registering Candidate ---');
        try {
            const regCanResponse = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'Test Candidate',
                    email: 'test_candidate@example.com',
                    password: 'Password123!',
                    role: 'candidate'
                })
            });
            const regCanData = await regCanResponse.json();
            console.log('✅ Candidate Registered:', regCanData.message || regCanResponse.status);
        } catch (err) {
            console.log('ℹ️ Candidate registration note:', err.message);
        }

        // 4. Login Candidate
        const logCanResponse = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'test_candidate@example.com',
                password: 'Password123!'
            })
        });
        const canData = await logCanResponse.json();
        const candidateToken = canData.token;
        console.log('✅ Candidate Logged In');

        // 5. Post Job as Recruiter
        console.log('\n--- Posting Job ---');
        let jobId;
        const jobResponse = await fetch(`${API_URL}/jobs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${recruiterToken}`
            },
            body: JSON.stringify({
                title: 'Software Engineer',
                description: 'Build awesome things',
                company: 'TechCorp',
                location: 'Remote',
                salary: '$100k - $150k'
            })
        });

        const jobData = await jobResponse.json();
        if (jobResponse.status !== 201) {
            console.log('❌ Job Post Failed:', jobData.message || jobData.error);
            // Fallback: use any existing job
            const allJobsRes = await fetch(`${API_URL}/jobs`, {
                headers: { Authorization: `Bearer ${recruiterToken}` }
            });
            const allJobs = await allJobsRes.json();
            if (allJobs.length > 0) {
                jobId = allJobs[0].id;
                console.log('ℹ️ Using existing Job ID:', jobId);
            } else {
                console.log('❌ No jobs found to apply to. Verification aborted.');
                return;
            }
        } else {
            jobId = jobData.id;
            console.log('✅ Job Posted, ID:', jobId);
        }

        // 6. Apply for Job as Candidate
        console.log('\n--- Applying for Job ---');
        const formData = new FormData();
        formData.append('jobId', jobId.toString());

        // Create a mock PDF blob
        const blob = new Blob(['%PDF-1.4\n1 0 obj\n<< /Title (Test) >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF'], { type: 'application/pdf' });
        formData.append('resume', blob, 'resume.pdf');

        const applyResponse = await fetch(`${API_URL}/applications/apply`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${candidateToken}`
            },
            body: formData
        });
        const applyData = await applyResponse.json();
        console.log('✅ Application Response:', applyData.message || applyData.error);

        // 7. Verify Recruiter Sees Application
        console.log('\n--- Verifying Recruiter View ---');
        const viewResponse = await fetch(`${API_URL}/applications/recruiter`, {
            headers: { Authorization: `Bearer ${recruiterToken}` }
        });
        const viewData = await viewResponse.json();

        if (!Array.isArray(viewData)) {
            console.log('❌ Unexpected response format for recruiter applications:', viewData);
            return;
        }

        const myApp = viewData.find(app => (app.jobId === jobId || app.JobId === jobId));
        if (myApp) {
            console.log('✅ SUCCESS: Recruiter successfully sees the application!');
            console.log('   Candidate Name:', myApp.candidate?.name);
            console.log('   Job Title:', myApp.Job?.title);
        } else {
            console.log('❌ FAILURE: Recruiter DOES NOT see the application in their Talent Pool.');
            console.log('   Applications found for recruiter:', viewData.length);
            if (viewData.length > 0) {
                console.log('   Sample Application Job ID:', viewData[0].jobId || viewData[0].JobId);
            }
        }

    } catch (err) {
        console.error('💥 Verification Failed:', err);
    }
}

verifyWorkflow();
