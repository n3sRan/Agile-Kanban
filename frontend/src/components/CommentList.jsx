import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { fetchComments, createComment } from "../store/modules/commentStore";
import CommentItem from "./CommentItem";
import { v4 as uuidv4 } from 'uuid';

// 评论框
const CommentBox = ({ taskId, currentUser, dispatch }) => {
    const [content, setContent] = useState('');

    const handleSubmit = () => {
        dispatch(createComment({
            id: uuidv4(),
            taskId,
            username: currentUser,
            content,
            createdAt: new Date(),
            likes: 0,
        })).then(() => {
            dispatch(fetchComments(taskId));
            console.log("Updated Comments.")
        })
            .catch(error => {
                console.error('Error creating comment:', error);
            });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 mt-4">
            <form onSubmit={handleSubmit}>
                {/* 输入框 */}
                <textarea
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your comment here..."
                    rows="2"
                ></textarea>

                {/* 发布按钮 */}
                <div className="flex justify-end mt-2">
                    <button
                        type="submit"
                        className="bg-blue-500 font-bold text-white px-4 py-1 rounded hover:bg-blue-700 ml-2"
                    >
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
};

const CommentList = () => {
    const { taskId } = useParams();
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comments.comments);
    const loading = useSelector((state) => state.comments.loading);
    const error = useSelector((state) => state.comments.error);
    const currentUser = useSelector(state => state.login.user?.username || 'User');

    useEffect(() => {
        dispatch(fetchComments(taskId));
        console.log("Loaded Comments.");
    }, [dispatch, taskId]);

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
        <>
            {/* 评论框 */}
            <CommentBox taskId={taskId} currentUser={currentUser} dispatch={dispatch} />

            {/* 评论列表 */}
            <div className="mt-4 mb-4">

                {/* 标题 */}
                <h2 className="text-2xl font-bold mb-4">
                    Comments
                </h2>

                {/* 评论*/}
                {comments.length === 0 ? (
                    <div className="text-center mt-16 mb-16">
                        <h3 className="text-lg font-bold mb-2">
                            No comments found.
                        </h3>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {comments.map(comment => (
                            <div key={comment.id}>
                                <CommentItem comment={comment} currentUser={currentUser} dispatch={dispatch} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>

    );
}

export default CommentList
