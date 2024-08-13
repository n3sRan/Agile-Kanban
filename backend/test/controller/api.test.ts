import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

import fs from 'fs/promises';
import path from 'path';
const attachmentsFilePath = path.join(__dirname, '..', '..', 'data', 'attachments.json');

describe('ApiController Integration Test', () => {
    let app;
    let expectedAttachmentsData;

    beforeAll(async () => {
        app = await createApp<Framework>();
        expectedAttachmentsData = JSON.parse(await fs.readFile(attachmentsFilePath, 'utf8'));

    });

    afterAll(async () => {
        await close(app);
    });

    // 获取附件列表
    it('should return all attachments', async () => {
        const result = await createHttpRequest(app).get('/api/upload');
        expect(result.status).toBe(200);
        expect(result.body).toEqual(expectedAttachmentsData);
    });

});