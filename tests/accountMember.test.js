const request = require('supertest');
const app = require('../src/app');
describe('Account Member API', () => {
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
  
    it('should create a new account member', async () => {
      const res = await request(app)
        .post('/account-members')
        .set('Authorization', `Bearer ${token}`)
        .send({
          account_id: 1,
          user_id: 1,
          role: 'Admin',
        });
  
      expect(res.statusCode).toEqual(201);
      expect(res.body.data).toHaveProperty('id');
    });
  });