import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

import fs from 'fs/promises';
import path from 'path';
const usersFilePath = path.join(__dirname, '..', '..', 'data', 'users.json');


describe('UserController Integration Test', () => {
    let app;
    let expectedUsersData;

    beforeAll(async () => {
        app = await createApp<Framework>();
        expectedUsersData = JSON.parse(await fs.readFile(usersFilePath, 'utf8'));

    });

    afterAll(async () => {
        await close(app);
    });

    // 获取用户列表
    it('should return all users', async () => {
        const result = await createHttpRequest(app).get('/users');
        expect(result.status).toBe(200);
        expect(result.body).toEqual(expectedUsersData);
    });

    // 注册
    it('should create a new user', async () => {
        const result = await createHttpRequest(app).post('/users').send({ username: 'admin', password: 'admin' });
        expect(result.status).toBe(200);
    });

    // 登录
    it('should log a user in', async () => {
        const result = await createHttpRequest(app).post('/users/login').send({ username: 'admin', password: 'admin' });
        expect(result.status).toBe(200);
    });

    // 获取用户
    it('should return a user by username', async () => {
        const result = await createHttpRequest(app).get('/users/admin');
        expect(result.status).toBe(200);
        // Add assertions for the data returned
    });

    // 删除用户
    it('should delete a user by username', async () => {
        const result = await createHttpRequest(app).delete('/users/admin');
        expect(result.status).toBe(200);
        // Add assertions for the data returned
    });
});