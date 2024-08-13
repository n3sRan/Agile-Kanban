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

    // 获取所有任务
    it('should return all tasks', async () => {
        const result = await createHttpRequest(app).get('/tasks');
        expect(result.status).toBe(200);
        expect(result.body).toEqual(expectedTasksData);
    });

    // 创建任务
    it('should create a new task', async () => {
        const result = await createHttpRequest(app).post('/tasks/projects/test').send({
            id: 'testTask',
            projectId: 'test',
            title: 'test',
            description: 'test',
            status: "NOT START",
        });
        expect(result.status).toBe(200);
        expect(result.body.message).toEqual('Task created');
    });

    // 删除任务
    it('should delete a task by id', async () => {
        const result = await createHttpRequest(app).delete('/tasks/testTask');
        expect(result.status).toBe(200);
        expect(result.body.message).toEqual('Task deleted');
    });
});