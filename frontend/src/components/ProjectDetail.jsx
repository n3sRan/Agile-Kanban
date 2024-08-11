import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate, Outlet } from 'react-router-dom';
import { fetchProjects, deleteProject } from '../store/modules/projectStore';

// 返回按钮
const BackButton = () => {
    return (
        <Link to="/dashboard/projects"
            className="bg-gray-500 hover:bg-gray-700 
                text-lg text-white hover:text-white 
                font-bold 
                py-2 px-4 rounded ">
            Project List
        </Link>
    );
}

// 新增按钮
const NewTaskButton = ({ projectId }) => {
    return (
        <Link to={`/dashboard/projects/${projectId}/tasks/new`}
            className="bg-green-500 hover:bg-green-700 
                text-lg text-white hover:text-white 
                font-bold 
                py-2 px-4 rounded ">
            New Task
        </Link>
    );
};

// 编辑按钮
const EditButton = ({ projectId }) => {
    return (
        <Link to={`/dashboard/projects/${projectId}/edit/detail`}
            className="bg-yellow-500 hover:bg-yellow-700 
                text-lg text-white hover:text-white 
                font-bold 
                py-2 px-4 rounded">
            Edit Project
        </Link>
    );

}

// 删除按钮
const DeleteButton = ({ projectId, navigate }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            dispatch(deleteProject(projectId)).catch(error => {
                console.error('Error deleting project:', error);
            });

            // 更新项目列表
            dispatch(fetchProjects());
            navigate('/dashboard/projects', { replace: true });
        }
    }

    return (
        <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 
                text-lg text-white hover:text-white 
                font-bold 
                py-2 px-4 rounded"
        >
            Delete Project
        </button>
    )
}

// 列表按钮
const TasksButton = ({ projectId }) => {
    return (
        <Link to={`/dashboard/projects/${projectId}/tasks`}
            className="bg-blue-500 hover:bg-blue-700 
                text-lg text-white hover:text-white 
                font-bold 
                py-2 px-4 rounded">
            Tasks List
        </Link>
    );
}

const ProjectDetail = () => {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const projects = useSelector(state => state.projects.projects);
    const project = projects.find(project => project.id === projectId);
    const currentUser = useSelector(state => state.login.user?.username || 'User');


    return (
        <div>
            <div className='flex justify-start mt-2 mb-2'>
                <h2 className='text-3xl font-bold '>{project.title}</h2>
            </div>

            <div className='flex justify-start text-lg mt-1 mb-1 ml-2'>
                {project.description}
            </div>

            <div className='flex justify-start text-md mt-1 mb-1 ml-2'>
                <p className='italic '>Created by</p>
                <span>&nbsp;</span>
                <span className='font-bold'> {project.createdBy}</span>
                .
            </div>

            {/* 按钮 */}
            <div className="flex justify-between mt-4">
                {/* 返回按钮 */}
                <BackButton />

                {project.createdBy === currentUser && (
                    <>
                        {/* 编辑项目按钮 */}
                        <EditButton projectId={projectId} />

                        {/* 删除项目按钮 */}
                        <DeleteButton projectId={projectId} navigate={navigate} />

                        {/* 新建任务按钮 */}
                        <NewTaskButton projectId={projectId} />
                    </>
                )}

                {/* 任务列表按钮 */}
                <TasksButton projectId={projectId} />
            </div>

            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default ProjectDetail;