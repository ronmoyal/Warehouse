import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import dotenv from 'dotenv';
import reqCon from '../controllers/requestController.js';
import { expect, jest } from '@jest/globals';

dotenv.config();

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe('/request', () => {
  it('should send mail to user about extend', async () => {
    const logSpy = jest.spyOn(global.console, 'log');
    reqCon.sendMailextend(process.env.EMAIL, '21/06/23');
    expect(logSpy).toHaveBeenCalledWith(
      `Email sent to user:${process.env.EMAIL}`
    );
  });
});

describe('/request', () => {
  it('should send mail to users about transfer', async () => {
    const logSpy = jest.spyOn(global.console, 'log');
    reqCon.sendMailtransfer(process.env.EMAIL, process.env.EMAIL);
    expect(logSpy).toHaveBeenCalledWith(
      `Email sent to user:${process.env.EMAIL} and ${process.env.EMAIL}`
    );
  });
});

//ADMIN - get the request from DB
describe('GET /request', () => {
  it('should get the request from DB', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.ADMIN_EMAIL,
      pwd: process.env.ADMIN_PASSWORD,
    });

    const response = await request(app)
      .get('/request')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.ADMIN_EMAIL}","role":"${token.body.role}"`,
      ]);

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

//student - extend the request, admin- approve the request
describe('PUT /request/extend', () => {
  it('student should extend the request', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.STUDENT_EMAIL,
      pwd: process.env.STUDENT_PASSWORD,
    });

    const response = await request(app)
      .put('/request/extend')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.STUDENT_EMAIL}","role":"${token.body.role}"`,
      ])
      .send({
        serialNumber: process.env.SERIAL_NUMBER,
        date: '2023-06-18',
        note: 'This is a test note',
        orderId: '6478eb2ae218e8a48b052803',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('New request was sent!');

    const token1 = await request(app).post('/signin').send({
      email: process.env.ADMIN_EMAIL,
      pwd: process.env.ADMIN_PASSWORD,
    });

    const response1 = await request(app)
      .put('/request/approved')
      .set('Cookie', [
        `auth=${token1.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.ADMIN_EMAIL}","role":"${token1.body.role}"`,
      ])
      .send({
        requestId: response.body.requ,
      });
    expect(response1.statusCode).toBe(200);
  });
});

//student - transfer the product, admin- approve the request
describe('POST /request/transfer', () => {
  it('should post new order', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.STUDENT_EMAIL,
      pwd: process.env.STUDENT_PASSWORD,
    });

    const response = await request(app)
      .post('/request/transfer')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.STUDENT_EMAIL}","role":"${token.body.role}"`,
      ])
      .send({
        serialNumber: 'WJBA001399',
        transferUserId: process.env.STUDENT_EMAIL,
        orderID: '645d156d5e8f42637fb4dc96',
      });

    expect(response.statusCode).toBe(201);

    const token1 = await request(app).post('/signin').send({
      email: process.env.ADMIN_EMAIL,
      pwd: process.env.ADMIN_PASSWORD,
    });

    const response1 = await request(app)
      .put('/request/approved')
      .set('Cookie', [
        `auth=${token1.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.ADMIN_EMAIL}","role":"${token1.body.role}"`,
      ])
      .send({
        requestId: response.body.requ,
      });
    expect(response1.statusCode).toBe(200);
  });
});
/* 
const token1 = await request(app).post('/signin').send({
  email: process.env.ADMIN_EMAIL,
  pwd: process.env.ADMIN_PASSWORD,
});

const response1 = await request(app)
  .put('/request/approved')
  .set('Cookie', [
    `auth=${token1.body.accessToken}`,
    `auth_type=Bearer`,
    `authState={"email":"${process.env.ADMIN_EMAIL}","role":"${token1.body.role}"`,
  ])
  .send({
    requestId: response.body.requ,
  });
expect(response.statusCode).toBe(201); */
