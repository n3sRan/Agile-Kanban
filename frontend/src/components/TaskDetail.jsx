import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { EditButton, StatusButton, DeleteButton } from './TaskItem';
import moment from 'moment';


// 评论按钮
const CommentButton = ({ projectId, taskId }) => {
    const location = useLocation();
    const isAttachmentActive = location.pathname.includes('attachment');

    return (
        <Link to={`/dashboard/projects/${projectId}/tasks/${taskId}/comment`}
            className={`text-lg text-white hover:text-white 
                    font-bold 
                    py-2 px-4 rounded 
                    ${isAttachmentActive ? 'bg-gray-500 hover:bg-gray-700' : 'bg-yellow-300 hover:bg-yellow-500'} `}>
            Comments
        </Link>
    );
}

// 附件按钮
const AttachmentButton = ({ projectId, taskId }) => {

    const location = useLocation();
    const isAttachmentActive = location.pathname.includes('attachment');

    return (
        <Link to={`/dashboard/projects/${projectId}/tasks/${taskId}/attachment`}
            className={`text-lg text-white hover:text-white 
            font-bold 
            py-2 px-4 rounded 
            ${isAttachmentActive ? 'bg-yellow-300 hover:bg-yellow-500' : 'bg-gray-500 hover:bg-gray-700'} `}>
            Attachments
        </Link>
    );
}
const TaskDetail = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 获取当前任务
    const { taskId } = useParams();
    const tasks = useSelector(state => state.tasks.tasks);
    const task = tasks.find(task => task.id === taskId);

    // 获取项目创建者
    const project = task ? useSelector(state => state.projects.projects.find(project => project.id === task.projectId)) : null;
    const createdBy = project ? project.createdBy : '';

    // 获取当前登录用户
    const currentUser = useSelector(state => state.login.user?.username || 'User');

    return (
        <div>
            {/* 任务详情 */}
            <div className="flex justify-between bg-white p-6 rounded-lg shadow-md">
                {/* 信息 */}
                <div className='ml-10 text-left'>
                    {/* 任务名称 */}
                    <h2 className="text-2xl font-bold mt-2 mb-4">{task.title}</h2>

                    {/* 任务描述 */}
                    <div className="text-gray-700 mb-2">Description: {task.description}</div>

                    {/* 任务负责人 */}
                    <div className="text-gray-700 mb-2">
                        Assigned to
                        <span>&nbsp;</span>
                        <span className="font-semibold">{task.assignedTo}</span>
                    </div>

                    {/* 任务状态 */}
                    <div className="text-gray-700 mb-2">
                        Status:
                        <span className="font-semibold"> {task.status}</span>
                    </div>

                    {/* 创建时间 */}
                    <div className="text-gray-700 mb-2">
                        Created at {moment(task.createdAt).format('LLLL')}.
                    </div>

                    {/* 更新时间 */}
                    <div className="text-gray-700">
                        Updated at {moment(task.updatedAt).format('LLLL')}.
                    </div>
                </div>


                {/* 交互按钮 */}
                <div className="flex flex-col items-center ">
                    {/* 状态按钮 */}
                    {task.assignedTo === currentUser && (<StatusButton task={task} dispatch={dispatch} />)}

                    {createdBy === currentUser && (
                        <div className="flex flex-col items-center ">
                            {/* 编辑按钮 */}
                            <EditButton taskId={taskId} projectId={task.projectId} navigate={navigate} back={'detail'} />
                            {/* 删除按钮 */}
                            <DeleteButton taskId={taskId} projectId={task.projectId} navigate={navigate} dispatch={dispatch} />
                        </div>
                    )}
                </div>
            </div>

            {/* 导航 */}
            <div className='flex justify-start mt-4 mb-4' >
                <CommentButton projectId={task.projectId} taskId={task.id} />
                <span className='mr-2'></span>
                <AttachmentButton projectId={task.projectId} taskId={task.id} />
            </div>

            {/* 子路由 */}
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default TaskDetail