const request = require('supertest');
const app = require('../src/app');

describe('Destination API', () => {
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
    it('should create a new destination', async () => {
      const res = await request(app)
        .post('/destinations')
        .set('Authorization', `Bearer ${token}`)
        .send({
          http_method: 'POST',
          url: 'https://webhook.site/a1',
          account_id: 1,
          headers: {
            "APP_ID": "1234APPID1234",
            "APP_SECRET": "secretkey",
            "ACTION": "user.update",
            "Content-Type": "application/json",
            "Accept": "*"
          }
        });
  
      expect(res.statusCode).toEqual(201);
      expect(res.body.data).toHaveProperty('id');
    });
  });
  