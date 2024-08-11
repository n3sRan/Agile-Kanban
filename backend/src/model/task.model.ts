export interface Task {
    id: string;
    projectId: string;
    title: string;
    description: string;
    status: string; // 任务状态，如"未开始"，"进行中"，"已完成"
    assignedTo: string; // 负责人的用户ID
    createdAt: Date;
    updatedAt: Date; // 任务最后更新的时间
}