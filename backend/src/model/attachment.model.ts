export interface Attachment {
    id: string;
    taskId: string;
    filename: string;
    path: string;
    mimeType: string;
    uploadAt: Date;
    uploadBy: string
}