const base = 'http://localhost:5000';

async function run() {
  try {
    const regRes = await fetch(base + '/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'CLI Node User', email: 'nodecli@example.com', password: '123456' }),
    });
    console.log('--- REGISTER ---');
    console.log(await regRes.json());

    const loginRes = await fetch(base + '/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'nodecli@example.com', password: '123456' }),
    });
    const login = await loginRes.json();
    console.log('--- LOGIN ---');
    console.log(login);

    const token = login.token;
    if (!token) {
      console.error('No token returned; aborting');
      return;
    }

    const createRes = await fetch(base + '/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title: 'Node CLI Task', description: 'Created by demo script' }),
    });
    console.log('--- CREATE TASK ---');
    console.log(await createRes.json());

    const listRes = await fetch(base + '/api/tasks', { headers: { Authorization: `Bearer ${token}` } });
    console.log('--- LIST TASKS ---');
    console.log(await listRes.json());
  } catch (err) {
    console.error('Error during demo requests:', err);
  }
}

run();
