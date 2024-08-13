import { Controller, Inject, Post, Files, Fields, Get, Del, Param } from '@midwayjs/core';
import { AttachmentService } from '../service/attachment.service';

@Controller('/api')
export class APIController {
  @Inject()
  ctx;

  @Inject()
  attachmentService: AttachmentService;

  // 上传附件
  @Post('/upload')
  async uploadAttachment(@Files() files, @Fields() fields) {
    const taskId = fields.taskId;
    const uploadBy = fields.uploadBy
    const fileUrls = [];

    for (const file of files) {
      if (!file) {
        throw new Error('No file was uploaded.');
      }
      const result = await this.attachmentService.uploadFile(file, taskId, uploadBy);
      fileUrls.push(result.fileUrl);
    }

    return { message: 'Files uploaded successfully.', fileUrls, taskId };
  }

  // 获取附件列表
  @Get('/upload')
  async getAttachments(): Promise<any> {
    return this.attachmentService.getAttachments();
  }

  // 删除附件
  @Del('/upload/:id')
  async deleteAttachment(@Param('id') id: string): Promise<{ message: string }> {
    try {
      return await this.attachmentService.deleteAttachment(id);
    } catch (error) {
      return { message: error.message };
    }
  }
}
