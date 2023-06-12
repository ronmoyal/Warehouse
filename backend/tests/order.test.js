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

//student - get the orders from DB
describe('GET /order/student', () => {
  it('should get the orders from DB', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.STUDENT_EMAIL,
      pwd: process.env.STUDENT_PASSWORD,
    });

    const response = await request(app)
      .get('/order/student')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.STUDENT_EMAIL}","role":"${token.body.role}"`,
      ]);

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe('GET /order/users', () => {
  it('should get the orders from DB', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.ADMIN_EMAIL,
      pwd: process.env.ADMIN_PASSWORD,
    });

    const response = await request(app)
      .get('/order/users')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.ADMIN_EMAIL}","role":"${token.body.role}"`,
      ]);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
//student - new order

describe('POST /order', () => {
  it('should post new order', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.STUDENT_EMAIL,
      pwd: process.env.STUDENT_PASSWORD,
    });

    const response = await request(app)
      .post('/order')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.STUDENT_EMAIL}","role":"${token.body.role}"`,
      ])
      .send({
        startDate: new Date('2023-06-20'),
        endDate: new Date('2023-06-26'),
        serialNumber: process.env.SERIAL_NUMBER,
        invitedUsers: [],
      });

    expect(response.statusCode).toBe(400); //Order already exists for selected dates
  });
});

describe('POST /order', () => {
  it('should post new order', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.STUDENT_EMAIL,
      pwd: process.env.STUDENT_PASSWORD,
    });

    const response = await request(app)
      .post('/order')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.STUDENT_EMAIL}","role":"${token.body.role}"`,
      ])
      .send({
        startDate: new Date('2023-06-20'),
        endDate: new Date('2023-06-26'),
        invitedUsers: [],
      });

    expect(response.statusCode).toBe(400); //Missing information
  });
});
describe('POST /order/rentTime', () => {
  it('should get renttime for product', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.STUDENT_EMAIL,
      pwd: process.env.STUDENT_PASSWORD,
    });

    const response = await request(app)
      .post('/order/rentTime')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.STUDENT_EMAIL}","role":"${token.body.role}"`,
      ])
      .send({
        serialNumber: process.env.SERIAL_NUMBER,
      });

    expect(response.statusCode).toBe(200); //rent time for product
  });
});
//
describe('POST /order', () => {
  it('should post new order', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.STUDENT_EMAIL,
      pwd: process.env.STUDENT_PASSWORD,
    });

    const response = await request(app)
      .post('/order')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.STUDENT_EMAIL}","role":"${token.body.role}"`,
      ])
      .send({
        startDate: new Date('2023-08-20'),
        endDate: new Date('2023-08-26'),
        serialNumber: process.env.SERIAL_NUMBER,
        invitedUsers: [],
      });

    expect(response.statusCode).toBe(201);
  });
});
//
