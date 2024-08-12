import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

import fs from 'fs/promises';
import path from 'path';
const tasksFilePath = path.join(__dirname, '..', '..', 'data', 'tasks.json');

describe('TaskController Integration Test', () => {
    let app;
    let expectedTasksData;

    beforeAll(async () => {
        app = await createApp<Framework>();
        expectedTasksData = JSON.parse(await fs.readFile(tasksFilePath, 'utf8'));

    });

    afterAll(async () => {
        await close(app);
    });

    // 获取任务列表
    it('should return all tasks', async () => {
        const result = await createHttpRequest(app).get('/tasks');
        expect(result.status).toBe(200);
        expect(result.body).toEqual(expectedTasksData);
    });

});