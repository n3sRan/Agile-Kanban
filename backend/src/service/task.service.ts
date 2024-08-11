import fs from 'fs/promises';
import path from 'path';
import { Provide } from '@midwayjs/core';
import { Task } from '../model/task.model'

@Provide()
export class TaskService {
    private tasksFilePath: string;

    constructor() {
        this.tasksFilePath = path.join(__dirname, '..', '..', 'data', 'tasks.json');
    }


    // 加载所有任务
    async loadTasks(): Promise<Task[]> {
        try {
            const data = await fs.readFile(this.tasksFilePath, 'utf-8');
            const tasksData = JSON.parse(data);
            return tasksData.map((task: Task) => task);
        } catch (error) {
            throw new Error('Failed to load tasks data.');
        }
    }

    // 保存任务数据
    async saveTasks(tasks: Task[]): Promise<void> {
        try {
            const data = JSON.stringify(tasks, null, 2);
            await fs.writeFile(this.tasksFilePath, data);
        } catch (error) {
            throw new Error('Failed to save tasks data.');
        }
    }

    // 新增任务
    async create(taskData: any): Promise<Task> {
        const tasks = await this.loadTasks();
        const newTask: Task = {
            ...taskData,
        };
        tasks.push(newTask);
        await this.saveTasks(tasks);
        return newTask;
    }

    // 列出指定项目的任务
    async list(projectId: string, status?: string): Promise<Task[]> {
        const tasks = await this.loadTasks();
        let filteredTasks = tasks.filter(task => task.projectId === projectId);
        if (status) {
            filteredTasks = filteredTasks.filter(task => task.status === status);
        }
        return filteredTasks;
    }

    // 更新任务
    async update(taskId: string, taskData: any): Promise<Task> {
        const tasks = await this.loadTasks();
        const index = tasks.findIndex(task => task.id === taskId);
        if (index === -1) {
            throw new Error('Task not found');
        }
        tasks[index] = { ...tasks[index], ...taskData };
        await this.saveTasks(tasks);
        return tasks[index];
    }

    // 删除指定任务
    async delete(taskId: string): Promise<void> {
        try {
            const tasks = await this.loadTasks();
            const index = tasks.findIndex(task => task.id === taskId);
            if (index === -1) {
                throw new Error('Task not found');
            }
            tasks.splice(index, 1);
            await this.saveTasks(tasks);
        } catch (error) {
            throw new Error('Failed to delete task: ' + error.message);
        }
    }
}