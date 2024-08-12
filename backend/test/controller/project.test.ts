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


    // 获取指定项目
    it('should return a project by id', async () => {
        const result = await createHttpRequest(app).get('/projects/b42460a9-79e9-4618-bad9-dbf97db01ccd');
        expect(result.status).toBe(200);
        // Add assertions for the data returned
    });
});