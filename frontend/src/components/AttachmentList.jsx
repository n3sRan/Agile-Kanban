import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uploadAttachment, fetchAttachments } from '../store/modules/attachmentStore';
import { useParams } from "react-router-dom";
import AttachmentItem from './AttachmentItem';

const UploadFile = ({ taskId, dispatch, currentUser }) => {

    const [files, setFiles] = useState(null);
    const [fileName, setFileName] = useState('No file selected');

    const handleFileChange = (event) => {
        setFiles(event.target.files)
        setFileName(event.target.files[0].name);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (files) {
            const formData = new FormData();
            formData.append('file', files[0]);
            formData.append('taskId', taskId);
            formData.append('uploadBy', currentUser);

            await dispatch(uploadAttachment(formData)).then(() => {
                dispatch(fetchAttachments());
                console.log("Updated Attachments.");

            }).catch(error => {
                console.error('Upload failed:', error);
            });
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 mt-4">
            <form onSubmit={handleSubmit}>
                <label htmlFor="file-input" className="bg-blue-500 font-bold text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
                    Choose File
                    <input
                        id="file-input"
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>
                <span className="ml-2">{fileName}</span>
                <button
                    type="submit"
                    className="bg-blue-500 font-bold text-white px-4 py-1 rounded hover:bg-blue-700 ml-2"
                >
                    Upload File
                </button>
            </form>
        </div>
    )
}


const AttachmentList = () => {
    const { taskId } = useParams();
    const dispatch = useDispatch();
    const attachments = useSelector((state) => state.attachments.attachments);
    const loading = useSelector((state) => state.attachments.loading);
    const error = useSelector((state) => state.attachments.error);
    const currentUser = useSelector(state => state.login.user?.username || 'User');


    useEffect(() => {
        dispatch(fetchAttachments());
        console.log("Got Attachments.");
    }, [dispatch, taskId]);

    const taskAttachments = attachments ? attachments.filter(attachment =>
        attachment.taskId === taskId
    ) : [];

    if (loading) {
        return (
            <div className="flex items-center justify-center mt-16 mb-16">
                <div className="animate-pulse w-16 h-16 bg-gray-200 rounded-full"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center mt-16 mb-16 text-red-500">
                <h3 className="text-lg font-bold mb-2">{error}</h3>
                <p>Please try refreshing the page.</p>
            </div>
        );
    }

    return (
        <div>
            {/* 上传附件 */}
            <UploadFile taskId={taskId} dispatch={dispatch} currentUser={currentUser}></UploadFile>

            {/* 附件列表 */}
            <div className="mt-4 mb-4">

                {/* 标题 */}
                <h2 className="text-3xl font-bold mb-4">
                    Attachments
                </h2>

                {/* 附件*/}
                {attachments.length === 0 ? (
                    <div className="text-center mt-16 mb-16">
                        <h3 className="text-lg font-bold mb-2">
                            No attachments found.
                        </h3>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {taskAttachments.map(attachment => (
                            <div key={attachment.id}>
                                <AttachmentItem attachment={attachment} dispatch={dispatch} currentUser={currentUser} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AttachmentList;