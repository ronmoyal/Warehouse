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
//homepage - get all product
describe('GET /products', () => {
  it('should get all the products', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.STUDENT_EMAIL,
      pwd: process.env.STUDENT_PASSWORD,
    });
    const response = await request(app)
      .get('/products')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.STUDENT_EMAIL}","role":"${token.body.role}"`,
      ]);

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
describe('GET /products', () => {
  it('should get all the products', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.ADMIN_EMAIL,
      pwd: process.env.ADMIN_PASSWORD,
    });
    const response = await request(app)
      .get('/products')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.ADMIN_EMAIL}","role":"${token.body.role}"`,
      ]);

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
// add new product
describe('POST /products', () => {
  it('should post new product', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.ADMIN_EMAIL,
      pwd: process.env.ADMIN_PASSWORD,
    });

    const response = await request(app)
      .post('/products')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.ADMIN_EMAIL}","role":"${token.body.role}"`,
      ])
      .send({
        s_n: 'WJCA001275',
        type: 'camera',
        model: 'camera',
        amount: 5,
        description: '',
        u_m: 'jdk',
        isborr: false,
      });

    expect(response.statusCode).toBe(400);
  });
});

describe('POST /products', () => {
  it('should post new product', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.ADMIN_EMAIL,
      pwd: process.env.ADMIN_PASSWORD,
    });

    const response = await request(app)
      .post('/products')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.ADMIN_EMAIL}","role":"${token.body.role}"`,
      ])
      .send({
        type: 'camera',
        model: 'camera',
        amount: 5,
        description: '',
        u_m: 'jdk',
        isborr: false,
      });

    expect(response.statusCode).toBe(400); //missing info
  });
});
//
describe('POST /products', () => {
  it('should post new product', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.ADMIN_EMAIL,
      pwd: process.env.ADMIN_PASSWORD,
    });

    const response = await request(app)
      .post('/products')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.ADMIN_EMAIL}","role":"${token.body.role}"`,
      ])
      .send({
        s_n: 'WJCA000075',
        type: 'camera',
        model: 'camera',
        amount: 5,
        description: '',
        u_m: 'jdk',
        isborr: false,
      });

    expect(response.statusCode).toBe(201);
  });
});
//

//only admin have access
describe('GET /products/suspended', () => {
  it('A student should be denied access to this data', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.STUDENT_EMAIL,
      pwd: process.env.STUDENT_PASSWORD,
    });
    const response = await request(app)
      .get('/products/suspended')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.STUDENT_EMAIL}","role":"${token.body.role}"`,
      ]);

    expect(response.statusCode).toBe(401);
  });
});

//only admin have access
describe('GET /products/suspended', () => {
  it('should get all suspended product', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.ADMIN_EMAIL,
      pwd: process.env.ADMIN_PASSWORD,
    });
    const response = await request(app)
      .get('/products/suspended')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.ADMIN_EMAIL}","role":"${token.body.role}"`,
      ]);

    expect(response.statusCode).toBe(200);
  });
});

describe('PUT /products/suspend', () => {
  it('should set product as suspend ', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.ADMIN_EMAIL,
      pwd: process.env.ADMIN_PASSWORD,
    });
    const response = await request(app)
      .put('/products/suspend')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.ADMIN_EMAIL}","role":"${token.body.role}"`,
      ])
      .send({
        serialNumber: process.env.SERIAL_NUMBER,
      });

    expect(response.statusCode).toBe(200);
  });
});

describe('PUT /products/return', () => {
  it('should set product as return', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.ADMIN_EMAIL,
      pwd: process.env.ADMIN_PASSWORD,
    });
    const response = await request(app)
      .put('/products/return')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.ADMIN_EMAIL}","role":"${token.body.role}"`,
      ])
      .send({
        serialNumber: process.env.SERIAL_NUMBER,
      });

    expect(response.statusCode).toBe(200);
  });
});

describe('PUT /products/borrow', () => {
  it('should set product as borrow ', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.ADMIN_EMAIL,
      pwd: process.env.ADMIN_PASSWORD,
    });
    const response = await request(app)
      .put('/products/borrow')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.ADMIN_EMAIL}","role":"${token.body.role}"`,
      ])
      .send({
        serialNumber: process.env.SERIAL_NUMBER,
        borrowingUser: process.env.STUDENT_EMAIL,
      });

    expect(response.statusCode).toBe(400);
  });
});
describe('PUT /products/borrow', () => {
  it('should set product as borrow ', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.ADMIN_EMAIL,
      pwd: process.env.ADMIN_PASSWORD,
    });
    const response = await request(app)
      .put('/products/borrow')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.ADMIN_EMAIL}","role":"${token.body.role}"`,
      ])
      .send({
        serialNumber: 'WJBA001399',
        borrowingUser: process.env.STUDENT_EMAIL,
      });

    expect(response.statusCode).toBe(200);
  });
});

describe('PUT /products/rentTime', () => {
  it('should set new rent range ', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.ADMIN_EMAIL,
      pwd: process.env.ADMIN_PASSWORD,
    });
    const response = await request(app)
      .put('/products/rentTime')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.ADMIN_EMAIL}","role":"${token.body.role}"`,
      ])
      .send({
        serialNumber: process.env.SERIAL_NUMBER,
        newDate: 13,
      });

    expect(response.statusCode).toBe(200);
  });
});
describe('PUT /products/unsuspend', () => {
  it('should set product as unsuspend ', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.ADMIN_EMAIL,
      pwd: process.env.ADMIN_PASSWORD,
    });
    const response = await request(app)
      .put('/products/unsuspend')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.ADMIN_EMAIL}","role":"${token.body.role}"`,
      ])
      .send({
        serialNumber: process.env.SERIAL_NUMBER,
      });

    expect(response.statusCode).toBe(200);
  });
});

describe('GET /products/suspension-history', () => {
  it('should get all suspended product', async () => {
    const token = await request(app).post('/signin').send({
      email: process.env.ADMIN_EMAIL,
      pwd: process.env.ADMIN_PASSWORD,
    });
    const response = await request(app)
      .get('/products/suspension-history')
      .set('Cookie', [
        `auth=${token.body.accessToken}`,
        `auth_type=Bearer`,
        `authState={"email":"${process.env.ADMIN_EMAIL}","role":"${token.body.role}"`,
      ]);

    expect(response.statusCode).toBe(200);
  });
});
