import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { deleteTask, fetchTasks, updateTask } from '../store/modules/taskStore';

// 删除按钮
export const DeleteButton = ({ taskId, projectId, navigate, dispatch }) => {

    const handleDelete = () => {
        if (window.confirm('Are you sure to delete this task?')) {
            dispatch(deleteTask(taskId)).catch(error => {
                console.error('Error deleting task:', error);
            });
        }
        // 更新任务列表
        dispatch(fetchTasks(projectId));
        console.log("Updated Tasks.")
        navigate(`/dashboard/projects/${projectId}/tasks`);
    }

    return (
        <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
            Delete
        </button>
    )
}

// 编辑按钮
export const EditButton = ({ taskId, projectId, navigate, back }) => {

    const handleEdit = () => {
        navigate(`/dashboard/projects/${projectId}/tasks/${taskId}/edit/${back}`)
    }

    return (
        <button
            onClick={handleEdit}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
            Edit
        </button>
    )

}

// 状态按钮
export const StatusButton = ({ task, dispatch }) => {
    let nextStatus = 'COMPLETED';
    if (task.status === 'NOT START') {
        nextStatus = 'PROGRESSING';
    }

    const handleClick = () => {
        dispatch(updateTask({
            ...task,
            status: nextStatus,
            updatedAt: new Date(),
        })).then(() => {
            dispatch(fetchTasks(task.projectId));
            console.log("Updated Tasks.");
        }).catch(error => {
            console.error('Error updating task:', error);
        });
    }

    return (
        <>
            {task.status === 'NOT START' && (
                <button
                    onClick={handleClick}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                    Start
                </button>
            )}
            {task.status === 'PROGRESSING' && (
                <button
                    onClick={handleClick}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                    Complete
                </button>
            )}
        </>
    )
}

// 详情按钮
const DetailButton = ({ projectId, taskId, navigate }) => {
    const handleDetail = () => {
        navigate(`/dashboard/projects/${projectId}/tasks/${taskId}`)
    }

    return (
        <button
            onClick={handleDetail}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
            View Details
        </button>
    )
}

const TaskItem = ({ task, currentUser }) => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    // 获取项目创建者
    const project = task ? useSelector(state => state.projects.projects.find(project => project.id === task.projectId)) : null;
    const createdBy = project ? project.createdBy : '';

    return (
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200 hover:bg-gray-100">
            {/* 任务信息 */}
            <div className="text-2xl font-bold mb-2">
                {task.title}
            </div>
            <div className="flex justify-between" >
                <div>
                    Status: <span className='font-bold'>{task.status}</span>
                </div>
                <div>
                    Assigned to <span className='font-bold'>{task.assignedTo}</span>
                </div>

            </div>

            {/* 交互按钮 */}
            <div className="flex justify-between mt-2">

                <div>
                    {/* 查看详情按钮 */}
                    <DetailButton projectId={task.projectId} taskId={task.id} navigate={navigate} />
                    <span className='mr-2'></span>
                    {/* 状态按钮 */}
                    {task.assignedTo === currentUser && (<StatusButton task={task} dispatch={dispatch} />)}

                </div>

                {createdBy === currentUser && (
                    <div>
                        {/* 编辑任务按钮 */}
                        <EditButton taskId={task.id} projectId={task.projectId} navigate={navigate} back={'list'} />
                        <span className='mr-2'></span>
                        {/* 删除任务按钮 */}
                        <DeleteButton taskId={task.id} projectId={task.projectId} navigate={navigate} dispatch={dispatch} />
                    </div>
                )}

            </div>
        </div>
    );
};

export default TaskItem;