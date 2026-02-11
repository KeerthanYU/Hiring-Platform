// Quick test script for API endpoints
const BASE = 'http://localhost:5002/api';

async function test() {
    console.log('=== Testing API Endpoints ===\n');

    // 1. Register users
    console.log('1. Registering admin...');
    let res = await fetch(`${BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test Admin', email: 'admin@test.com', password: 'admin123', role: 'admin' })
    });
    let data = await res.json();
    console.log('   Status:', res.status, '| Response:', JSON.stringify(data));

    console.log('2. Registering recruiter...');
    res = await fetch(`${BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test Recruiter', email: 'recruiter@test.com', password: 'recruiter123', role: 'recruiter' })
    });
    data = await res.json();
    console.log('   Status:', res.status, '| Response:', JSON.stringify(data));

    console.log('3. Registering candidate...');
    res = await fetch(`${BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test Candidate', email: 'candidate@test.com', password: 'candidate123', role: 'candidate' })
    });
    data = await res.json();
    console.log('   Status:', res.status, '| Response:', JSON.stringify(data));

    // 2. Login as recruiter
    console.log('\n4. Logging in as recruiter...');
    res = await fetch(`${BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'recruiter@test.com', password: 'recruiter123' })
    });
    data = await res.json();
    const recruiterToken = data.token;
    console.log('   Status:', res.status, '| Token:', recruiterToken ? 'OK' : 'MISSING');
    console.log('   User:', JSON.stringify(data.user));

    // 3. Login as candidate
    console.log('5. Logging in as candidate...');
    res = await fetch(`${BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'candidate@test.com', password: 'candidate123' })
    });
    data = await res.json();
    const candidateToken = data.token;
    console.log('   Status:', res.status, '| Token:', candidateToken ? 'OK' : 'MISSING');

    // 4. Login as admin
    console.log('6. Logging in as admin...');
    res = await fetch(`${BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@test.com', password: 'admin123' })
    });
    data = await res.json();
    const adminToken = data.token;
    console.log('   Status:', res.status, '| Token:', adminToken ? 'OK' : 'MISSING');

    // 5. Test /me endpoint
    console.log('\n7. Testing /me endpoint...');
    res = await fetch(`${BASE}/auth/me`, {
        headers: { 'Authorization': `Bearer ${candidateToken}` }
    });
    data = await res.json();
    console.log('   Status:', res.status, '| Response:', JSON.stringify(data));

    // 6. Admin approves recruiter - first get users
    console.log('\n8. Admin fetching users...');
    res = await fetch(`${BASE}/admin/users`, {
        headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    data = await res.json();
    console.log('   Status:', res.status, '| Users count:', data.users?.length);

    // Find recruiter user ID
    const recruiterUser = data.users?.find(u => u.role === 'recruiter');
    if (recruiterUser) {
        console.log('9. Admin approving recruiter (ID:', recruiterUser.id, ')...');
        res = await fetch(`${BASE}/admin/recruiters/${recruiterUser.id}/approve`, {
            method: 'PATCH',
            headers: { 'Authorization': `Bearer ${adminToken}`, 'Content-Type': 'application/json' }
        });
        data = await res.json();
        console.log('   Status:', res.status, '| Response:', JSON.stringify(data));
    }

    // 7. Recruiter creates a job
    console.log('\n10. Recruiter creating job...');
    res = await fetch(`${BASE}/jobs`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${recruiterToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: 'Senior Frontend Engineer',
            description: 'Build amazing UIs with React and TypeScript',
            company: 'StarkTech AI',
            location: 'Remote',
            salary: '$140k - $190k'
        })
    });
    data = await res.json();
    console.log('   Status:', res.status, '| Response:', JSON.stringify(data));
    const jobId = data.id;

    // 8. Get all jobs (public)
    console.log('\n11. Fetching all jobs...');
    res = await fetch(`${BASE}/jobs`);
    data = await res.json();
    console.log('   Status:', res.status, '| Jobs count:', data.length);
    if (data.length > 0) console.log('   First job:', data[0].title);

    // 9. Get notifications (recruiter)
    console.log('\n12. Fetching recruiter notifications...');
    res = await fetch(`${BASE}/notifications`, {
        headers: { 'Authorization': `Bearer ${recruiterToken}` }
    });
    data = await res.json();
    console.log('   Status:', res.status, '| Notifications:', data.length);

    // 10. Admin metrics
    console.log('\n13. Admin fetching metrics...');
    res = await fetch(`${BASE}/admin/metrics`, {
        headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    data = await res.json();
    console.log('   Status:', res.status, '| Metrics:', JSON.stringify(data.metrics));

    // 11. Admin audit logs
    console.log('\n14. Admin fetching audit logs...');
    res = await fetch(`${BASE}/admin/audit-logs`, {
        headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    data = await res.json();
    console.log('   Status:', res.status, '| Logs count:', data.logs?.length);

    // 12. Recruiter fetching applications
    console.log('\n15. Recruiter fetching applications...');
    res = await fetch(`${BASE}/applications/recruiter`, {
        headers: { 'Authorization': `Bearer ${recruiterToken}` }
    });
    data = await res.json();
    console.log('   Status:', res.status, '| Applications:', data.length);

    console.log('\n=== All Tests Complete ===');
}

test().catch(console.error);
