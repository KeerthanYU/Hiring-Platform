import fetch from 'node-fetch';

const API_URL = 'http://localhost:5002/api';

async function testRBAC() {
    console.log('🔒 Testing RBAC Protections...\n');

    // 1. Login as Candidate (you need a valid candidate email/pass in DB)
    // For this test, we'll try to access admin routes without a token first
    console.log('1. Testing Admin Route without Token:');
    try {
        const res = await fetch(`${API_URL}/admin/users`);
        console.log(`Status: ${res.status} (Expected: 401)`);
        if (res.status === 401) console.log('✅ PASS'); else console.log('❌ FAIL');
    } catch (e) { console.log('Error:', e.message); }

    // 2. Register a new user and try to force admin role
    console.log('\n2. Testing Privilege Escalation (Register as Admin):');
    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Fake Admin',
                email: `hacker${Date.now()}@test.com`,
                password: 'password123',
                role: 'admin' // 👈 Trying to force admin
            })
        });
        const data = await res.json();
        if (data.user && data.user.role === 'candidate') {
            console.log(`User created with role: ${data.user.role} (Expected: candidate)`);
            console.log('✅ PASS');
        } else {
            console.log(`User created with role: ${data.user?.role}`);
            console.log('❌ FAIL');
        }
    } catch (e) { console.log('Error:', e.message); }
}

testRBAC();
