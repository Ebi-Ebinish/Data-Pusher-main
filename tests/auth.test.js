const request = require('supertest');
const app = require('../src/app');

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const uniqueId = `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const email = `test_${uniqueId}@example.com`;

    const res = await request(app)
      .post('/auth/register')
      .send({
        email: email,
        password: 'testpass123',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('id');
  });

  it('should reject invalid password user registration', async () => {
    const email = `dupe_${Date.now()}@example.com`;

    await request(app).post('/auth/register').send({ email, password: 'test123' });
    const res = await request(app).post('/auth/register').send({ email, password: 'test123' });
    console.log("auth.test::", res.body);
    expect(res.statusCode).toEqual(422);
    expect(res.body.success).toBe(false);
    expect(res.body.errors[0]['msg']).toBe("Password must be at least 8 characters");
  });
});
