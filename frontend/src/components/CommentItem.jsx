import { deleteComment, fetchComments, likeComment } from '../store/modules/commentStore';
import moment from 'moment';

// 删除按钮
const DeleteCommentButton = ({ commentId, taskId, dispatch }) => {
    const handleDelete = () => {
        if (window.confirm('Are you sure to delete this comment?')) {
            dispatch(deleteComment(commentId)).catch(error => {
                console.error('Error deleting comment:', error);
            });
        }
        // 更新评论列表
        dispatch(fetchComments(taskId));
        console.log("Updated Comments.");
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

// 点赞按钮
const LikeButton = ({ commentId, taskId, dispatch }) => {
    const handleLike = () => {
        dispatch(likeComment(commentId)).then(() => {
            dispatch(fetchComments(taskId));
            console.log("Liked.");
        })
            .catch(error => {
                console.error('Error like comment:', error);
            });

    }

    return (
        <button
            onClick={handleLike}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
            Like
        </button>
    )
}


const CommentItem = ({ comment, currentUser, dispatch }) => {

    return (
        <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md border border-gray-200">
            {/* 用户名 */}
            <div className="text-lg font-bold">
                {comment.username}
            </div>
            {/* 评论内容 */}
            <div className='text-lg'>
                {comment.content}
            </div>
            <div>
                {/* 评论时间 */}
                <div className="text-gray-500 text-md">
                    {moment(comment.createdAt).format('lll')}
                </div>
                {/* 删除按钮 */}
                {currentUser === comment.username && (
                    <DeleteCommentButton commentId={comment.id} taskId={comment.taskId} dispatch={dispatch} />
                )}
            </div>
        </div>
    );
};

export default CommentItem;