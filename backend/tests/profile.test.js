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

// student prifile
describe('GET /profile/Student', () => {
  it('should get all the order of student', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.STUDENT_EMAIL,
      pwd: process.env.STUDENT_PASSWORD,
    });
    const response = await request(app)
      .get('/profile/Student')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.STUDENT_EMAIL}","role":"${token.body.role}"`,
      ]);

    expect(response.statusCode).toBe(200);
    expect(response.body.orders.length).toBeGreaterThan(0);
  });
});

//admin - borrowed equipment
describe('GET /profile/Admin', () => {
  it('should get all the borrowd equipment', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.ADMIN_EMAIL,
      pwd: process.env.ADMIN_PASSWORD,
    });
    const response = await request(app)
      .get('/profile/Admin')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.ADMIN_EMAIL}","role":"${token.body.role}"`,
      ]);

    if (response.body.orders !== undefined) {
      expect(response.statusCode).toBe(200);
      expect(response.body.orders.length).toBeGreaterThan(0);
    } else {
      expect(response.statusCode).toBe(400);
    }
  });
});

// teacher profile
describe('GET /profile/Teacher', () => {
  it('should get all the order of techer', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.TEACHER_EMAIL,
      pwd: process.env.TEACHER_PASSWORD,
    });
    const response = await request(app)
      .get('/profile/Teacher')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.TEACHER_EMAIL}","role":"${token.body.role}"`,
      ]);

    expect(response.statusCode).toBe(200);
    expect(response.body.orders.length).toBeGreaterThan(0);
  });
});
