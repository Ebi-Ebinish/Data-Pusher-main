const request = require('supertest');
const app = require('../src/app');

describe('Log API', () => {
  let token;

  beforeAll(async () => {
    // Register a user (if needed)
    const email = `log_${Date.now()}@test.com`;
    const password = 'testpass123';

    await request(app)
      .post('/auth/register')
      .send({ email, password });

    // Login the user to get the token
    const res = await request(app)
      .post('/auth/login')
      .send({ email, password });

    token = res.body.token;
  });

  it('should fetch logs for authorized user', async () => {
    const res = await request(app)
      .get('/logs')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
