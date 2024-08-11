import { Controller, Get, Post, Del, Put, Body, Param, Query, Inject } from '@midwayjs/core';
import { TaskService } from '../service/task.service';

@Controller('/tasks')
export class TaskController {
    @Inject()
    taskService: TaskService;

    // 创建任务
    @Post('/projects/:projectId')
    async createTask(@Param('projectId') projectId: string, @Body() taskData: any) {
        const task = await this.taskService.create(taskData);
        return { message: 'Task created', task };
    }

    // 获取任务列表
    @Get('/projects/:projectId')
    async getTasks(@Param('projectId') projectId: string, @Query('status') status: string) {
        const tasks = await this.taskService.list(projectId, status);
        return tasks;
    }

    // 更新任务
    @Put('/:taskId')
    async updateTask(@Param('taskId') taskId: string, @Body() taskData: any) {
        const updatedTask = await this.taskService.update(taskId, taskData);
        return { message: 'Task updated', task: updatedTask };
    }

    // 删除任务
    @Del('/:taskId')
    async deleteTask(@Param('taskId') taskId: string) {
        await this.taskService.delete(taskId);
        return { message: 'Task deleted' };
    }

}