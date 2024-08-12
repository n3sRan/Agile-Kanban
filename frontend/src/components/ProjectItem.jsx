import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProject, fetchProjects } from '../store/modules/projectStore';

// 删除按钮
const DeleteButton = ({ projectId, navigate }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            dispatch(deleteProject(projectId)).then(() => {
                // 更新项目列表
                dispatch(fetchProjects());
                navigate('/dashboard/projects');
            }).catch(error => {
                console.error('Error deleting project:', error);
            });
        }
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
const EditButton = ({ projectId, navigate }) => {

    const handleEdit = () => {
        navigate(`/dashboard/projects/${projectId}/edit/list`)
    }

    return (
        <button
            onClick={handleEdit}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2"
        >
            Edit
        </button>
    )
}

// 详情按钮
const DetailButton = ({ projectId, navigate }) => {
    const handleDetail = () => {
        navigate(`/dashboard/projects/${projectId}`)
    }

    return (
        <button
            onClick={handleDetail}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2"
        >
            View Details
        </button>
    )
}


const ProjectItem = ({ project, currentUser }) => {

    const navigate = useNavigate();


    return (

        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200 hover:bg-gray-100">
            {/* 项目名称 */}
            <div className="text-2xl font-bold mb-2">
                {project.title}
            </div>
            <div>
                Created by <span className='font-bold'>{project.createdBy}</span>
            </div>

            {/* 交互按钮 */}
            <div className="flex justify-between mt-4">

                <div>
                    {/* 查看详情按钮 */}
                    <DetailButton projectId={project.id} navigate={navigate} />
                </div>

                {project.createdBy === currentUser && (
                    <div>
                        {/* 编辑项目按钮 */}
                        <EditButton projectId={project.id} navigate={navigate} />

                        {/* 删除项目按钮 */}
                        <DeleteButton projectId={project.id} navigate={navigate} />
                    </div>
                )}

            </div>
        </div>

    );
};

export default ProjectItem;