import fs from 'fs/promises';
import path from 'path';
import { Provide } from '@midwayjs/core';
import { Comment } from '../model/comment.model';

@Provide()
export class CommentService {
    private commentsFilePath: string;

    constructor() {
        this.commentsFilePath = path.join(__dirname, '..', '..', 'data', 'comments.json');
    }

    // 加载评论
    async loadComments(): Promise<Comment[]> {
        try {
            const data = await fs.readFile(this.commentsFilePath, 'utf-8');
            const commentsData = JSON.parse(data);
            return commentsData;
        } catch (error) {
            throw new Error('Failed to load comments data.');
        }
    }

    // 保存评论
    async saveComments(comments: Comment[]): Promise<void> {
        try {
            const data = JSON.stringify(comments, null, 2);
            await fs.writeFile(this.commentsFilePath, data);
        } catch (error) {
            throw new Error('Failed to save comments data.');
        }
    }

    // 新增评论
    async create(taskId: string, commentData: any): Promise<Comment> {
        const comments = await this.loadComments();
        const newComment: Comment = {
            taskId,
            ...commentData,
        };
        comments.push(newComment);
        await this.saveComments(comments);
        return newComment;
    }

    // 加载指定任务的评论列表
    async list(taskId: string): Promise<Comment[]> {
        const comments = await this.loadComments();
        return comments.filter(comment => comment.taskId === taskId);
    }

    // 删除评论
    async delete(commentId: string): Promise<void> {
        const comments = await this.loadComments();
        const index = comments.findIndex(comment => comment.id === commentId);
        if (index === -1) {
            throw new Error('Comment not found');
        }
        comments.splice(index, 1);
        await this.saveComments(comments);
    }

    // 点赞
    async like(commentId: string): Promise<Comment> {
        const comments = await this.loadComments();
        const index = comments.findIndex(comment => comment.id === commentId);
        if (index === -1) {
            throw new Error('Comment not found');
        }

        comments[index].likes += 1;
        await this.saveComments(comments);
        return comments[index];
    }
}