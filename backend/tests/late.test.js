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

//student - logout
describe('GET /send', () => {
  it('should logout and clear cookies', async () => {
    const response = await request(app).get('/send');

    expect(response.statusCode).toBe(200);
  });
});
