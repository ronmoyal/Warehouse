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

describe('POST /signin', () => {
  it('should signin and set refresh and access tokens', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.STUDENT_EMAIL,
      pwd: process.env.STUDENT_PASSWORD,
    });

    expect(token.statusCode).toBe(201);
  });
});

describe('POST /signin', () => {
  it('should signin and set refresh and access tokens', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.TEACHER_EMAIL,
      pwd: process.env.TEACHER_PASSWORD,
    });

    expect(token.statusCode).toBe(201);
  });
});

describe('POST /signin', () => {
  it('should signin and set refresh and access tokens', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.ADMIN_EMAIL,
      pwd: process.env.ADMIN_PASSWORD,
    });

    expect(token.statusCode).toBe(201);
  });
});

describe('POST /signin', () => {
  it('worrng password', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.ADMIN_EMAIL,
      pwd: '451284',
    });

    expect(token.statusCode).toBe(400);
  });
});
