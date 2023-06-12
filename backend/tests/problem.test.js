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

//student - new problem report
describe('POST /problem', () => {
  it('should post new problem report', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.STUDENT_EMAIL,
      pwd: process.env.STUDENT_PASSWORD,
    });

    const response = await request(app)
      .post('/problem')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.STUDENT_EMAIL}","role":"${token.body.role}"`,
      ])
      .send({
        serialNumber: process.env.SERIAL_NUMBER,
        note: 'This is a test problem report',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe(
      `The problem was reported successfully!`
    );
  });
});

//teacer - new problem report
describe('POST /problem', () => {
  it('teacher - should post new problem report', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.TEACHER_EMAIL,
      pwd: process.env.TEACHER_PASSWORD,
    });

    const response = await request(app)
      .post('/problem')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.TEACHER_EMAIL}","role":"${token.body.role}"`,
      ])
      .send({
        serialNumber: process.env.SERIAL_NUMBER,
        note: 'This is a test problem report - teacher',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe(
      `The problem was reported successfully!`
    );
  });
});
