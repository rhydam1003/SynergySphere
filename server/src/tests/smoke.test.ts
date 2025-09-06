process.env.CLEAR_DB_BETWEEN_TESTS = 'false';

import request from 'supertest';
import app from '../app';

// Helper to build auth header
const auth = (token: string) => ({ Authorization: `Bearer ${token}` });

describe('API Smoke Test', () => {
  let user1Token = '';
  let user2Token = '';
  let user2Id = '';
  let projectId = '';
  let taskId = '';
  let threadId = '';

  const user1 = { name: 'Owner One', email: 'owner1@example.com', password: 'Owner123!' };
  const user2 = { name: 'Member Two', email: 'member2@example.com', password: 'Member123!' };

  it('registers user1 (owner)', async () => {
    const res = await request(app).post('/api/auth/register').send(user1);
    expect([201, 409]).toContain(res.status);

    // If already exists, login to get token
    if (res.status === 201) {
      user1Token = res.body.data.accessToken;
    } else {
      const login = await request(app)
        .post('/api/auth/login')
        .send({ email: user1.email, password: user1.password });
      expect(login.status).toBe(200);
      user1Token = login.body.data.accessToken;
    }
    expect(user1Token).toBeTruthy();
  });

  it('registers user2 (member)', async () => {
    const res = await request(app).post('/api/auth/register').send(user2);
    expect([201, 409]).toContain(res.status);

    if (res.status === 201) {
      user2Token = res.body.data.accessToken;
      user2Id = res.body.data.user._id;
    } else {
      const login = await request(app)
        .post('/api/auth/login')
        .send({ email: user2.email, password: user2.password });
      expect(login.status).toBe(200);
      user2Token = login.body.data.accessToken;
      // fetch profile to get id
      const me = await request(app).get('/api/auth/me').set(auth(user2Token)).send();
      user2Id = me.body.data._id;
    }

    expect(user2Token).toBeTruthy();
    expect(user2Id).toBeTruthy();
  });

  it('returns current user with /auth/me', async () => {
    const res = await request(app).get('/api/auth/me').set(auth(user1Token)).send();
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe(user1.email.toLowerCase());
  });

  it('lists users', async () => {
    const res = await request(app).get('/api/users').set(auth(user1Token)).send();
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('creates a project', async () => {
    const res = await request(app)
      .post('/api/projects')
      .set(auth(user1Token))
      .send({ name: 'Alpha Project', description: 'Our first MVP project' });
    expect(res.status).toBe(201);
    projectId = res.body.data._id;
    expect(projectId).toBeTruthy();
  });

  it('lists projects', async () => {
    const res = await request(app).get('/api/projects').set(auth(user1Token)).send();
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('gets a project by id', async () => {
    const res = await request(app).get(`/api/projects/${projectId}`).set(auth(user1Token)).send();
    expect(res.status).toBe(200);
    expect(res.body.data._id).toBe(projectId);
  });

  it('updates the project', async () => {
    const res = await request(app)
      .patch(`/api/projects/${projectId}`)
      .set(auth(user1Token))
      .send({ name: 'Alpha Project v2' });
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe('Alpha Project v2');
  });

  it('adds a member to project', async () => {
    const res = await request(app)
      .post(`/api/projects/${projectId}/members`)
      .set(auth(user1Token))
      .send({ userId: user2Id, role: 'member' });
    expect(res.status).toBe(200);
  });

  it('updates member role', async () => {
    const res = await request(app)
      .patch(`/api/projects/${projectId}/members/${user2Id}`)
      .set(auth(user1Token))
      .send({ role: 'manager' });
    expect(res.status).toBe(200);
  });

  it('fetches project activity', async () => {
    const res = await request(app)
      .get(`/api/projects/${projectId}/activity`)
      .set(auth(user1Token))
      .send();
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('creates a task', async () => {
    const res = await request(app)
      .post(`/api/projects/${projectId}/tasks`)
      .set(auth(user1Token))
      .send({
        title: 'Design Login Page',
        description: 'Responsive',
        priority: 'high',
        dueDate: new Date().toISOString(),
      });
    expect(res.status).toBe(201);
    taskId = res.body.data._id;
    expect(taskId).toBeTruthy();
  });

  it('lists project tasks', async () => {
    const res = await request(app)
      .get(`/api/projects/${projectId}/tasks`)
      .set(auth(user1Token))
      .send();
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('gets a task by id', async () => {
    const res = await request(app).get(`/api/tasks/${taskId}`).set(auth(user1Token)).send();
    expect(res.status).toBe(200);
    expect(res.body.data._id).toBe(taskId);
  });

  it('updates a task', async () => {
    const res = await request(app)
      .patch(`/api/tasks/${taskId}`)
      .set(auth(user1Token))
      .send({ status: 'in_progress' });
    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('in_progress');
  });

  it('creates a thread', async () => {
    const res = await request(app)
      .post(`/api/projects/${projectId}/threads`)
      .set(auth(user1Token))
      .send({ title: 'Design Discussion' });
    expect(res.status).toBe(201);
    threadId = res.body.data._id;
    expect(threadId).toBeTruthy();
  });

  it('lists threads', async () => {
    const res = await request(app)
      .get(`/api/projects/${projectId}/threads`)
      .set(auth(user1Token))
      .send();
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('gets a thread by id', async () => {
    const res = await request(app).get(`/api/threads/${threadId}`).set(auth(user1Token)).send();
    expect(res.status).toBe(200);
    expect(res.body.data._id).toBe(threadId);
  });

  it('posts a message to thread', async () => {
    const res = await request(app)
      .post(`/api/threads/${threadId}/messages`)
      .set(auth(user1Token))
      .send({ body: 'What about a dark theme?' });
    expect(res.status).toBe(201);
  });

  it('lists messages in thread', async () => {
    const res = await request(app)
      .get(`/api/threads/${threadId}/messages`)
      .set(auth(user1Token))
      .send();
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('lists notifications', async () => {
    const res = await request(app).get('/api/notifications').set(auth(user1Token)).send();
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('marks all notifications read', async () => {
    const res = await request(app)
      .patch('/api/notifications/read-all')
      .set(auth(user1Token))
      .send();
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('health check', async () => {
    const res = await request(app).get('/health').send();
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('OK');
  });

  it('cleans up: delete task', async () => {
    const res = await request(app).delete(`/api/tasks/${taskId}`).set(auth(user1Token)).send();
    expect(res.status).toBe(200);
  });

  it('removes member and completes', async () => {
    const res = await request(app)
      .delete(`/api/projects/${projectId}/members/${user2Id}`)
      .set(auth(user1Token))
      .send();
    expect(res.status).toBe(200);
  });
});
