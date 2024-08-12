import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

import fs from 'fs/promises';
import path from 'path';
const commentsFilePath = path.join(__dirname, '..', '..', 'data', 'comments.json');

describe('CommentController Integration Test', () => {
    let app;
    let expectedCommentsData;

    beforeAll(async () => {
        app = await createApp<Framework>();
        expectedCommentsData = JSON.parse(await fs.readFile(commentsFilePath, 'utf8'));

    });

    afterAll(async () => {
        await close(app);
    });

    // 获取评论列表
    it('should return pointed comments', async () => {
        const taskId = "da8501ce-83bd-4112-8fa5-35e019523a95";
        const result = await createHttpRequest(app).get(`/comments/${taskId}`);
        expect(result.status).toBe(200);
        expect(result.body).toEqual(expectedCommentsData.filter(comment => comment.taskId === taskId));
    });

});