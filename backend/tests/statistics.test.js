import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import dotenv from 'dotenv';

dotenv.config();

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe('GET /statistics', () => {
  it('should get statistics on orders and produst', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.ADMIN_EMAIL,
      pwd: process.env.ADMIN_PASSWORD,
    });

    const response = await request(app)
      .get('/statistics')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.ADMIN_EMAIL}","role":"${token.body.role}"`,
      ]);

    expect(response.statusCode).toBe(200);
  });
});
