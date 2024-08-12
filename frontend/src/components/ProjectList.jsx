import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../store/modules/projectStore';
import ProjectItem from './ProjectItem'


const ProjectList = () => {
    // 读取项目列表
    const projects = useSelector(state => state.projects.projects);
    const currentUser = useSelector(state => state.login.user?.username || 'NOT LOGGED IN');
    const dispatch = useDispatch();

    useEffect(() => {
        if (!projects || projects.length === 0) {
            dispatch(fetchProjects());
            console.log(" Projects Loaded in List.");

        }
    }, [projects, dispatch]);

    // 过滤
    const filteredProjects = projects ? projects.filter(project =>
        project.participants && project.participants.includes(currentUser)
    ) : [];

    return (
        <div className="max-w-7xl mx-auto p-4">

            {/* 标题 */}
            <h2 className="text-3xl font-bold mt-8 mb-4">
                My Projects
            </h2>

            {/* 项目按钮 */}
            {filteredProjects.length === 0 ? (
                <div className="text-center mt-16 mb-16">
                    <h3 className="text-lg font-bold mb-2">
                        No projects found.
                    </h3>
                    <p className="text-gray-500">Create one by clicking the "New Project" button.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredProjects.map(project => (
                        <div key={project.id}>
                            <ProjectItem project={project} currentUser={currentUser} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectList;