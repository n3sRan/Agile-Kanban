import fs from 'fs/promises';
import path from 'path';
import { Provide } from '@midwayjs/core';
import { v4 as uuidv4 } from 'uuid';
import { Attachment } from '../model/attachment.model';

@Provide()
export class AttachmentService {
    private attachmentsPath: string;
    private attachmentsJsonPath: string;

    constructor() {
        this.attachmentsPath = path.join(__dirname, '..', '..', 'data', 'attachments');
        this.attachmentsJsonPath = path.join(__dirname, '..', '..', 'data', 'attachments.json');
    }

    // 上传文件到附件目录
    async uploadFile(fileData: { filename: string, data: string, mimeType: string }, taskId: string, uploadBy: string): Promise<{ message: string; fileUrl: string; taskId: string }> {
        if (!fileData.filename || !fileData.data) {
            throw new Error('File data or filename is missing.');
        }
        const id = uuidv4();

        const newPath = path.join(this.attachmentsPath, id);
        const targetPath = path.join(newPath, fileData.filename);

        // 新建以文件id为文件名的目录
        await fs.mkdir(newPath, { recursive: true });

        // 从临时目录复制到附件目录
        await fs.copyFile(fileData.data, targetPath);

        // 更新json文件
        await this.updateAttachmentsJson({
            id,
            taskId,
            filename: fileData.filename,
            path: targetPath,
            mimeType: fileData.mimeType,
            uploadAt: new Date(),
            uploadBy,
        });

        return {
            message: 'File uploaded successfully.',
            fileUrl: targetPath,
            taskId,
        };
    }

    // 更新json文件
    async updateAttachmentsJson(attachmentData: any): Promise<void> {
        let attachments = [];

        try {
            const data = await fs.readFile(this.attachmentsJsonPath, 'utf-8');
            attachments = JSON.parse(data);
        } catch {
            // attachments.json不存在，初始化为[]
            attachments = [];
        }

        attachments.push(attachmentData);
        await fs.writeFile(this.attachmentsJsonPath, JSON.stringify(attachments, null, 2));
    }

    async getAttachments(): Promise<Attachment[]> {
        let attachments = [];

        try {
            const data = await fs.readFile(this.attachmentsJsonPath, 'utf-8');
            attachments = JSON.parse(data);
        } catch {
            // attachments.json不存在，初始化为[]
            attachments = [];
        }

        return attachments;
    }

    async deleteAttachment(id: string): Promise<{ message: string }> {
        try {
            const attachments = await this.getAttachments();
            const attachment = attachments.find((a) => a.id === id);
            if (!attachment) {
                return { message: 'Attachment not found.' };
            }

            // 删除文件
            await fs.rm(attachment.path, { recursive: true });

            // 从json文件中移除该文件的记录
            const updatedAttachments = attachments.filter((a) => a.id !== id);
            await fs.writeFile(this.attachmentsJsonPath, JSON.stringify(updatedAttachments, null, 2));

            return { message: 'Attachment deleted successfully.' };
        } catch (error) {
            return { message: `Error deleting attachment: ${error.message}` };
        }
    }
}