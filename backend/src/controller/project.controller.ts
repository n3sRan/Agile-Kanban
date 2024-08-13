import { Controller, Get, Post, Body, Param, Inject, Del, Put } from '@midwayjs/core';
import { ProjectService } from '../service/project.service';

@Controller('/projects')
export class ProjectController {
    @Inject()
    projectService: ProjectService;

    // 获取项目列表
    @Get('/')
    async listProjects() {
        return await this.projectService.listProjects();
    }

    // 创建项目
    @Post('/')
    async createProject(@Body() projectData: any) {
        const project = await this.projectService.createProject(projectData);
        return { message: 'Project created', project };
    }

    // 获取指定项目
    @Get('/:id')
    async getProject(@Param('id') id: string) {
        const project = await this.projectService.getProject(id);
        if (project) {
            return project;
        } else {
            throw new Error('Project not found');
        }
    }

    // 更新指定项目
    @Put('/:id')
    async updateProject(@Param('id') id: string, @Body() projectData: any) {
        const updatedProject = await this.projectService.updateProject(id, projectData);
        return { message: 'Project updated', project: updatedProject };
    }

    // 删除指定项目
    @Del('/:id')
    async deleteProject(@Param('id') id: string) {
        await this.projectService.deleteProject(id);
        return { message: 'Project deleted' };
    }
}