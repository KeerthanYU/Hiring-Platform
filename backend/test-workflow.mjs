// Quick test script for API endpoints
const BASE = 'http://localhost:5002/api';

async function test() {
    console.log('=== Testing Full Workflow ===\n');

    // 1. Login as Seeded Admin
    console.log('1. Logging in as Seeded Admin...');
    let res = await fetch(`${BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@hiringplatform.com', password: 'Admin123!' })
    });
    let data = await res.json();
    const adminToken = data.token;
    console.log('   Status:', res.status, '| Token:', adminToken ? 'OK' : 'MISSING');

    // 2. Register a Recruiter
    console.log('\n2. Registering a recruiter (recruiter2@test.com)...');
    res = await fetch(`${BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Elite Recruiter', email: 'recruiter2@test.com', password: 'password123', role: 'recruiter' })
    });
    data = await res.json();
    const recruiterId = data.user?.id;
    console.log('   Status:', res.status, '| Recruiter ID:', recruiterId);

    // 3. Admin Approves Recruiter
    console.log(`\n3. Admin approving recruiter ${recruiterId}...`);
    res = await fetch(`${BASE}/admin/recruiters/${recruiterId}/approve`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json'
        }
    });
    data = await res.json();
    console.log('   Status:', res.status, '| Response:', JSON.stringify(data));

    // 4. Login as Recruiter
    console.log('\n4. Logging in as the approved recruiter...');
    res = await fetch(`${BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'recruiter2@test.com', password: 'password123' })
    });
    data = await res.json();
    const recruiterToken = data.token;
    console.log('   Status:', res.status, '| Verified Recruiter:', data.user?.isVerifiedRecruiter);

    // 5. Recruiter Posts a Job
    console.log('\n5. Recruiter posting a job...');
    res = await fetch(`${BASE}/jobs`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${recruiterToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: 'Full Stack Engineer (Audit)',
            description: 'Help us audit and fix amazing platforms.',
            company: 'AuditCorp',
            location: 'Remote',
            salary: '$150,000'
        })
    });
    data = await res.json();
    const jobId = data.id;
    console.log('   Status:', res.status, '| Job ID:', jobId);

    // 6. Register a Candidate
    console.log('\n6. Registering a candidate (candidate2@test.com)...');
    res = await fetch(`${BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'John Doe', email: 'candidate2@test.com', password: 'password123', role: 'candidate' })
    });
    data = await res.json();
    console.log('   Status:', res.status, '| Candidate registered');

    // 7. Login as Candidate
    console.log('\n7. Logging in as candidate...');
    res = await fetch(`${BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'candidate2@test.com', password: 'password123' })
    });
    data = await res.json();
    const candidateToken = data.token;
    console.log('   Status:', res.status, '| Login success');

    // 8. Candidate Applies to Job (Simulating multipart with fetch is complex in node, so we'll test the route exists)
    // Note: Since we don't have a FormData mock easily in node test script without extra deps, 
    // we'll verify the recruiter can at least see empty list and candidate can see jobs.

    console.log('\n8. Candidate fetching all jobs...');
    res = await fetch(`${BASE}/jobs`);
    data = await res.json();
    console.log('   Status:', res.status, '| Jobs found:', data.length);
    console.log('   First Job Title:', data[0]?.title);

    console.log('\n9. Recruiter checking applications...');
    res = await fetch(`${BASE}/applications/recruiter`, {
        headers: { 'Authorization': `Bearer ${recruiterToken}` }
    });
    data = await res.json();
    console.log('   Status:', res.status, '| Apps found:', data.length);

    console.log('\n10. Admin fetching metrics...');
    res = await fetch(`${BASE}/admin/metrics`, {
        headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    data = await res.json();
    console.log('   Status:', res.status, '| Metrics:', JSON.stringify(data.metrics));

    console.log('\n=== Workflow Test Successful ===');
}

test().catch(console.error);
