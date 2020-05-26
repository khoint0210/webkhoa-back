import request from 'supertest';
import app from '../../app';
import Category from './category.model';
import User from '../../modules/users/user.model';

const demoCategory = {
  name: 'Thông báo sinh viên',
  featuredImage: 'https://images.unsplash.com/photo-1522199794616-8a62b541f762?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=900&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=407c2c823dff1d8ae5df9a6146381bc3',
};

const demoCategoryUpdate = {
  name: 'Thông báo sinh viên mới',
  featuredImage: 'https://images.unsplash.com/photo-1522199794616-8a62b541f762?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=900&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=407c2c823dff1d8ae5df9a6146381bc3',
};

const demoUserLogin = {
  lecturerId: '93989',
  password: '123456789',
};

const demoUser = {
  lecturerId: '93989',
  password: '123456789',
  fullname: 'Nguyen Truong KHoi',
  role: [
    4,
  ],
  email: 'khoihhhhl@gmail.com',
};

let token;

let categoryID;

describe('user module', () => {
  beforeAll(async () => { // eslint-disable-line
    await User.remove({});
    await Category.remove({});
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

  test('should create category', async () => {
    const response = await request(app).post('/category').set('Authorization', token).send(demoCategory);
    expect(response.statusCode).toBe(201);
    const list = await Category.find({ isRemoved: false });
    expect(response.body.name).toEqual(list[0].name);
    categoryID = response.body._id;
  });

  test('should update category', async () => {
    const response = await request(app).patch(`/category/${categoryID}`).set('Authorization', token).send(demoCategoryUpdate);
    expect(response.statusCode).toBe(200);
    const list = await Category.find({ _id: categoryID, isRemoved: false });
    expect(response.body.name).toEqual(list[0].name);
  });

  test('should get category list', async () => {
    const response = await request(app).get('/category');
    expect(response.statusCode).toBe(200);
    const list = await Category.find({ isRemoved: false });
    expect(response.body.length).toEqual(list.length);
  });

  test('should delete category', async () => {
    const response = await request(app).delete(`/category/${categoryID}`).set('Authorization', token);
    expect(response.statusCode).toBe(200);
    const list = await Category.find({ _id: categoryID });
    expect(list[0].isRemoved).toEqual(true);
  });
});
