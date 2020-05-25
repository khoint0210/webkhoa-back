import request from 'supertest';

import app from '../../app';
import User from '../../modules/users/user.model';
import Sponsor from './sponsor.model';

const demoSponser = {
  name: 'Innoteq Ltd',
  link: 'https://innoteq.vn',
  image: 'https://innoteq.vn/wp-content/uploads/2017/09/INNOTEQ.png',
};

const demoSponserUpdate = {
  name: 'Innoteq Vietnam',
  link: 'https://innoteq.vn',
  image: 'https://innoteq.vn/wp-content/uploads/2017/09/INNOTEQ.png',
};

const demoUserLogin = {
  lecturerId: '93989',
  password: '123456789',
};

const demoUser = {
  lecturerId: '93989',
  password: '123456789',
  fullname: 'Nguyen Truong KHoi',
  role: 1,
  email: 'khoihhhhl@gmail.com',
};

let token;

let sponsorID;

describe('user module', () => {
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

  test('should create sponsor', async () => {
    const response = await request(app).post('/sponsor/').set('Authorization', token).send(demoSponser);
    expect(response.statusCode).toBe(201);
    sponsorID = response.body._id;
  });

  test('should get sponsor list', async () => {
    const response = await request(app).get('/sponsor/');
    expect(response.statusCode).toBe(200);
    const list = await Sponsor.find({ isRemoved: false });
    expect(response.body.length).toBe(list.length);
  });

  test('should update sponsor', async () => {
    const response = await request(app).patch(`/sponsor/${sponsorID}`).set('Authorization', token).send(demoSponserUpdate);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toEqual(demoSponserUpdate.name);
  });
  
  test('should delete sponsor', async () => {
    const response = await request(app).delete(`/sponsor/${sponsorID}`).set('Authorization', token);
    expect(response.statusCode).toBe(200);
    expect(response.body.isRemoved).toBe(true);
  });
});
