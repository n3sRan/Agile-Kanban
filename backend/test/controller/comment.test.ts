import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('CommentController Integration Test', () => {
    let app;

    beforeAll(async () => {
        app = await createApp<Framework>();

    });

    afterAll(async () => {
        await close(app);
    });

    // 创建评论
    it('should create a new comment', async () => {
        const result = await createHttpRequest(app).post('/comments/test').send({
            id: 'testComment',
            taskId: 'test',
        });
        expect(result.status).toBe(200);
        expect(result.body.message).toEqual('Comment created');
    });

    // 获取评论列表
    it('should return pointed comments', async () => {
        const result = await createHttpRequest(app).get('/comments/test');
        expect(result.status).toBe(200);
    });

    // 删除评论
    it('should delete a comment by id', async () => {
        const result = await createHttpRequest(app).delete('/comments/testComment');
        expect(result.status).toBe(200);
        expect(result.body.message).toEqual('Comment deleted');
    });

});