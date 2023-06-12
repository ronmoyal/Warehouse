import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import dotenv from 'dotenv';
import Users from '../model/Users.js';

dotenv.config();

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterEach(async () => {
  await mongoose.connection.close();
});

//student - register
describe('POST /register', () => {
  it('should post new register(student) and insert to db', async () => {
    const response = await request(app).post('/register').send({
      email: process.env.STUDENT_EMAIL,
      id: '111111111',
      pwd: '123123',
      code: '',
    });

    expect(response.statusCode).toBe(409); //email already exists
  });
});

//teacher - register
describe('POST /register', () => {
  it('should post new register(teacher)and insert to db', async () => {
    const response = await request(app).post('/register').send({
      email: process.env.TEACHER_EMAIL,
      id: '222222222',
      pwd: '123123',
      code: '',
    });

    expect(response.statusCode).toBe(409); //email already exists
  });
});

//admin - register
describe('POST /register', () => {
  it('should post new register(admin)and insert to db', async () => {
    const response = await request(app).post('/register').send({
      email: process.env.ADMIN_EMAIL,
      id: '333333333',
      pwd: '123123',
      code: 'ILOVEYOU',
      code: '',
    });

    expect(response.statusCode).toBe(409); //email already exists
  });
});
describe('POST /register', () => {
  it('should post new register(teacher)and insert to db', async () => {
    const response = await request(app).post('/register').send({
      email: process.env.STUDENT_EMAIL,
      id: '123123123',
      pwd: '123123',
      code: '',
    });

    expect(response.statusCode).toBe(409); //ID already exists.
  });
});

describe('POST /register', () => {
  it('should post new register(teacher)and insert to db', async () => {
    const response = await request(app).post('/register').send({
      email: 'test@gmail.com',
      id: '951628437',
      pwd: '123123',
      code: '',
    });

    expect(response.statusCode).toBe(400); //Invalid email address. Please use an SCE email address.
  });
});
describe('POST /register', () => {
  it('should post new register(teacher)and insert to db', async () => {
    const response = await request(app).post('/register').send({
      email: 'test@ac.sce.ac.il',
      id: '9516237',
      pwd: '123123',
      code: '',
    });

    expect(response.statusCode).toBe(400); //Invalid ID
  });
});

describe('POST /register', () => {
  it('should post new register(teacher)and insert to db', async () => {
    const response = await request(app).post('/register').send({
      email: 'test@ac.sce.ac.il',
      id: '9516237',
      pwd: '123123',
      code: '54',
    });

    expect(response.statusCode).toBe(409); //Incorrect Code.
  });
});

describe('POST /register', () => {
  it('should post new register(teacher)and insert to db', async () => {
    const response = await request(app).post('/register').send({
      id: '9516237',
      pwd: '123123',
      code: '54',
    });

    expect(response.statusCode).toBe(400); //Email ID and password are required.
  });
});
//
describe('POST /register', () => {
  it('should post new register(teacher)and insert to db', async () => {
    const response = await request(app).post('/register').send({
      email: 'test@ac.sce.ac.il',
      id: '951628437',
      pwd: '123123',
      code: '',
    });

    expect(response.statusCode).toBe(201); //New Student created!
  });
});

describe('POST /register', () => {
  it('should post new register(teacher)and insert to db', async () => {
    const response = await request(app).post('/register').send({
      email: 'test@sce.ac.il',
      id: '961628437',
      pwd: '123123',
      code: '',
    });

    expect(response.statusCode).toBe(201); //New Teacher created!
  });
});

describe('POST /register', () => {
  it('should post new register(teacher)and insert to db', async () => {
    const response = await request(app).post('/register').send({
      email: 'test1@ac.sce.ac.il',
      id: '961228437',
      pwd: '123123',
      code: 'ILOVEYOU',
    });

    expect(response.statusCode).toBe(201); //New Admin created!
  });
});
//
