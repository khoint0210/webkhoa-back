import request from 'supertest';

import app from '../../app';
import User from './user.model';

const demoUser = {
  lecturerId: '93989',
  password: '123456789',
  fullname: 'Nguyen Truong KHoi',
  role: [4],
  email: 'khoihhhhl@gmail.com',
};

const demoUserLogin = {
  lecturerId: '93989',
  password: '123456789',
};

const demoUserUpdate = {
  password: '1234567890',
  fullname: 'Nguyen Truong Khoi',
  role: [4],
  email: 'khoihhhhl@gmail.com',
};

let token;

describe('user modules', () => {
  beforeAll(async () => { // eslint-disable-line
    await User.remove({});
  });

  test('should create user', async () => {
    const response = await request(app).post('/user/register').send(demoUser);
    expect(response.statusCode).toBe(201);
    expect(response.body.lecturerId).toEqual(demoUser.lecturerId);
    expect(response.body.token).toHaveLength(153);
  });

  test('should login', async () => {
    const response = await request(app).post('/user/login').send(demoUserLogin);
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toHaveLength(153);
    token = response.body.token;
  });

  test('should return user list', async () => {
    const response = await request(app).get('/user/').set('Authorization', token);
    expect(response.statusCode).toBe(200);
    const list = await User.find({ isRemoved: false });
    expect(response.body.total).toBe(list.length);
  });

  test('should update user', async () => {
    const response = await request(app).patch(`/user/${demoUserLogin.lecturerId}`).set('Authorization', token).send(demoUserUpdate);
    expect(response.statusCode).toBe(200);
    expect(response.body.fullname).toEqual(demoUserUpdate.fullname);
  });

  test('should remove user', async () => {
    const response = await request(app).delete(`/user/${demoUserLogin.lecturerId}`).set('Authorization', token);
    expect(response.statusCode).toBe(200);
    const user = await User.findOne({ lecturerId: demoUserLogin.lecturerId });
    expect(user.isRemoved).toBe(true);
  });
});
