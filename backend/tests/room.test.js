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

describe('GET /room', () => {
  it('should get user list', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.STUDENT_EMAIL,
      pwd: process.env.STUDENT_PASSWORD,
    });

    const response = await request(app)
      .get('/room')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.STUDENT_EMAIL}","role":"${token.body.role}"`,
      ]);

    expect(response.statusCode).toBe(200);
  });
});

describe('POST /room', () => {
  it('should get user list', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.STUDENT_EMAIL,
      pwd: process.env.STUDENT_PASSWORD,
    });

    const response = await request(app)
      .post('/room')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.STUDENT_EMAIL}","role":"${token.body.role}"`,
      ])
      .send({
        roomDate: new Date('2023-06-20'),
        roomNumber: '1',
        invitedUsers: [],
        startTime: '10:00',
        endTime: '12:00',
      });

    expect(response.statusCode).toBe(400);
  });
});
describe('POST /room', () => {
  it('should get user list', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.STUDENT_EMAIL,
      pwd: process.env.STUDENT_PASSWORD,
    });

    const response = await request(app)
      .post('/room')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.STUDENT_EMAIL}","role":"${token.body.role}"`,
      ])
      .send({
        roomNumber: '1',
        invitedUsers: [],
        startTime: '10:00',
        endTime: '12:00',
      });

    expect(response.statusCode).toBe(400); //Missing information
  });
});
//
describe('POST /room', () => {
  it('should get user list', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.STUDENT_EMAIL,
      pwd: process.env.STUDENT_PASSWORD,
    });

    const response = await request(app)
      .post('/room')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.STUDENT_EMAIL}","role":"${token.body.role}"`,
      ])
      .send({
        roomDate: new Date('2023-06-20'),
        roomNumber: '1',
        invitedUsers: [],
        startTime: '17:00',
        endTime: '18:00',
      });

    expect(response.statusCode).toBe(201); //New order was added!
  });
});
//
