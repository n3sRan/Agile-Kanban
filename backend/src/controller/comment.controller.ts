import { Controller, Get, Post, Del, Put, Body, Param, Inject } from '@midwayjs/core';
import { CommentService } from '../service/comment.service';

@Controller('/comments')
export class CommentController {
    @Inject()
    commentService: CommentService;

    // 新增评论
    @Post('/:taskId')
    async createComment(@Param('taskId') taskId: string, @Body() commentData: any) {
        const comment = await this.commentService.createComment(taskId, commentData);
        return { message: 'Comment created', comment };
    }

    // 获取评论列表
    @Get('/:taskId')
    async getComments(@Param('taskId') taskId: string) {
        const comments = await this.commentService.listComments(taskId);
        return comments;
    }

    // 删除评论
    @Del('/:commentId')
    async deleteComment(@Param('commentId') commentId: string) {
        await this.commentService.deleteComment(commentId);
        return { message: 'Comment deleted' };
    }

    // 点赞评论
    @Put('/likes/:commentId')
    async likeComment(@Param('commentId') commentId: string) {
        const likedComment = await this.commentService.likeComment(commentId);
        return { message: 'Comment liked', comment: likedComment };
    }
}