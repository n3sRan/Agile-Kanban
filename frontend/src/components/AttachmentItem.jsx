import moment from 'moment';
import { deleteAttachment, fetchAttachments } from '../store/modules/attachmentStore';

// 删除附件按钮
const DeleteAttachmentButton = ({ attachmentId, taskId, dispatch }) => {
    const handleDelete = () => {
        if (window.confirm('Are you sure to delete this attachment?')) {
            dispatch(deleteAttachment(attachmentId)).catch(error => {
                console.error('Error deleting attachment:', error);
            });
        }
        // 更新附件列表
        dispatch(fetchAttachments(taskId));
        console.log("Updated Attachment.");
    }

    return (
        <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white text-md font-bold py-1 px-2 rounded mt-1"
        >
            Delete
        </button>
    )
}

const AttachmentItem = ({ attachment, currentUser, dispatch }) => {
    return (
        <div>
            <div className="flex justify-between bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div>
                    <div className="text-lg font-bold mb-2">
                        {attachment.filename}
                    </div>
                    <div className='text-md'>
                        Uploaded By <span className="font-semibold">{attachment.uploadBy}</span>
                    </div>
                </div>

                <div className='justify-end'>
                    <div className="text-gray-500 text-md">
                        {moment(attachment.uploadAt).format('lll')}
                    </div>
                    {attachment.uploadBy === currentUser && (
                        <DeleteAttachmentButton attachmentId={attachment.id} taskId={attachment.taskId} dispatch={dispatch} />
                    )}
                </div>

            </div>
        </div>
    )
}

export default AttachmentItem