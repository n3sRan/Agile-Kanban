export interface Comment {
    id: string;
    taskId: string;
    username: string;
    content: string;
    createdAt: Date;
    likes: number;
}