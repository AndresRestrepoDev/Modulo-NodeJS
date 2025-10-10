import request from 'supertest';
import jest from '../appJest.ts';
import { sequelize } from '../config/database.ts'; 
import dotenv from 'dotenv';

dotenv.config();

describe('Auth API', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
  });

  it('Debe rechazar login sin API key', async () => {
    const res = await request(jest)
      .post('/api/auth/login')
      .send({ email: 'admin@example.com', password: '123456' });
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/API Key inválida/i);
  });

  it('Debe rechazar login con credenciales incorrectas', async () => {
    const res = await request(jest)
      .post('/api/auth/login')
      .set('x-api-key', process.env.API_KEY!)
      .send({ email: 'noexiste@example.com', password: '123456' });
    expect(res.statusCode).toBe(404);
  });

  it('Debe permitir login con credenciales correctas', async () => {
    const res = await request(jest)
      .post('/api/auth/login')
      .set('x-api-key', process.env.API_KEY!)
      .send({ email: 'admin@example.com', password: '123456' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
