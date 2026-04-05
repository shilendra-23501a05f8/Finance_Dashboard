const BASE_URL = 'http://localhost:5000/api';

async function testAnalyst() {
    console.log("1. Registering analyst user...");
    await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Analyst Test', email: 'analyst2@test.com', password: 'password123', role: 'analyst' })
    });

    console.log("2. Logging in as analyst...");
    const loginRes = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'analyst2@test.com', password: 'password123' })
    });
    
    if (!loginRes.ok) {
        console.error("Login failed!", await loginRes.json());
        return;
    }
    const { token } = await loginRes.json();
    
    console.log("3. Fetching dashboard/summary with analyst token...");
    const sumRes = await fetch(`${BASE_URL}/dashboard/summary`, { 
        headers: { 'Authorization': `Bearer ${token}` } 
    });
    
    if (sumRes.ok) {
        console.log("✅ Success! Dashboard summary for Analyst:", await sumRes.json());
    } else {
        console.error("❌ Failed! Status:", sumRes.status, await sumRes.json());
    }
}
testAnalyst();
