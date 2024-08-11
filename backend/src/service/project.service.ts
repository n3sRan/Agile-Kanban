import fs from 'fs/promises';
import path from 'path';
import { Provide } from '@midwayjs/core';
import { Project } from '../model/project.model'; // 导入 Project 接口

@Provide()
export class ProjectService {
    private projectsFilePath: string;

    constructor() {
        this.projectsFilePath = path.join(__dirname, '..', '..', 'data', 'projects.json');
    }

    // 加载项目
    async loadProjects(): Promise<Project[]> {
        try {
            const data = await fs.readFile(this.projectsFilePath, 'utf-8');
            const projectsData = JSON.parse(data);
            return projectsData.map((project: Project) => project);
        } catch (error) {
            throw new Error('Failed to load projects data.');
        }
    }

    // 写入项目
    async saveProjects(projects: Project[]): Promise<void> {
        try {
            const data = JSON.stringify(projects, null, 2);
            await fs.writeFile(this.projectsFilePath, data);
        } catch (error) {
            throw new Error('Failed to save projects data.');
        }
    }

    // 新增项目
    async createProject(projectData: any): Promise<Project> {
        const projects = await this.loadProjects();
        const newProject: Project = {
            ...projectData
        };
        projects.push(newProject);
        await this.saveProjects(projects);
        return newProject;
    }

    // 更新指定项目
    async updateProject(projectId: string, projectData: any): Promise<Project> {
        const projects = await this.loadProjects();
        const index = projects.findIndex(project => project.id === projectId);
        if (index === -1) {
            throw new Error('Project not found');
        }
        projects[index] = { ...projects[index], ...projectData };
        await this.saveProjects(projects);
        return projects[index];
    }


    // 获取指定项目
    async getProject(id: string): Promise<Project | undefined> {
        const projects = await this.loadProjects();
        return projects.find((project) => project.id === id);
    }

    // 删除指定项目
    async deleteProject(id: string): Promise<void> {
        try {
            const projects = await this.loadProjects();
            const index = projects.findIndex(project => project.id === id);
            if (index === -1) {
                throw new Error('Project not found');
            }
            projects.splice(index, 1);
            await this.saveProjects(projects);
        } catch (error) {
            throw new Error('Failed to delete project: ' + error.message);
        }
    }

    // 列出项目
    async listProjects(): Promise<Project[]> {
        return await this.loadProjects();
    }
}