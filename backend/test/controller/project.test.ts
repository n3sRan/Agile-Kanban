import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

import fs from 'fs/promises';
import path from 'path';
const projectsFilePath = path.join(__dirname, '..', '..', 'data', 'projects.json');

describe('ProjectController Integration Test', () => {
    let app;
    let expectedProjectsData;

    beforeAll(async () => {
        app = await createApp<Framework>();
        expectedProjectsData = JSON.parse(await fs.readFile(projectsFilePath, 'utf8'));

    });

    afterAll(async () => {
        await close(app);
    });

    // 获取项目列表
    it('should return all projects', async () => {
        const result = await createHttpRequest(app).get('/projects');
        expect(result.status).toBe(200);
        expect(result.body).toEqual(expectedProjectsData);
    });

    // 创建项目
    it('should create a new project', async () => {
        const result = await createHttpRequest(app).post('/projects').send({
            id: 'test',
            title: 'test',
            description: 'test',
            createdAt: new Date(),
            createdBy: 'test',
        });
        expect(result.status).toBe(200);
        expect(result.body.message).toEqual('Project created');
    });

    // 获取指定项目
    it('should return a project by id', async () => {
        const result = await createHttpRequest(app).get('/projects/test');
        expect(result.status).toBe(200);
        // expect(result.body.project.title).toEqual('test');
    });


    // 删除指定项目
    it('should delete a project by id', async () => {
        const result = await createHttpRequest(app).delete('/projects/test');
        expect(result.status).toBe(200);
        expect(result.body.message).toEqual('Project deleted');
    });
});