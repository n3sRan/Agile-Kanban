import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateProject, fetchProjects } from '../store/modules/projectStore';
import { fetchUsers } from '../store/modules/userStore';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const ProjectEdit = () => {

    // 获取当前项目
    const { projectId } = useParams();
    const { back } = useParams();
    const projects = useSelector(state => state.projects.projects);
    const project = projects.find(project => project.id === projectId);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //返回方式
    const goBack = () => {
        if (back === "list") {
            navigate('/dashboard/projects', { replace: true });
        } else {
            navigate(`/dashboard/projects/${projectId}`, { replace: true })
        }
    }

    // 获取当前登录的用户名
    const currentUser = useSelector(state => state.login.user?.username || 'NOT LOGGED IN');
    // 获取所有用户列表以供选择项目参与者
    const users = useSelector(state => state.users.users);

    useEffect(() => {
        if (!users || users.length === 0) {
            dispatch(fetchUsers());
            console.log(" Users Loaded at Edit.");
        }
        setParticipants((formatUsersAsOptions(users).filter(user => user.value !== currentUser)).filter(option => project.participants.includes(option.value)));
    }, [users, dispatch]);

    // 准备选项格式
    const formatUsersAsOptions = (users) => {
        return users.map((user) => ({
            // 使用username作为value和label
            value: user.username,
            label: user.username,
        }));
    };
    // 获取选项内容
    const options = formatUsersAsOptions(users).filter(user => user.value !== currentUser); // 过滤掉当前登录的用户
    // 添加动画
    const animatedComponents = makeAnimated();

    // 初始状态设置
    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description);
    const [participants, setParticipants] = useState(options.filter(option => project.participants.includes(option.value)));

    // 处理提交
    const handleSave = () => {
        const participantNames = participants.map(participant => participant.value);

        participantNames.push(project.createdBy);

        dispatch(updateProject({
            ...project,
            title,
            description,
            participants: participantNames
        })).catch(error => {
            console.error('Error updating project:', error);
        });

        alert("Saved.");

        dispatch(fetchProjects());
        console.log("Updated Project List.")
        goBack();
    }

    // 处理取消
    const handleCancel = () => {
        setTitle('');
        setDescription('');
        setParticipants([]);
        goBack()
    };

    const titleStyle = "block text-gray-700 text-lg font-bold mb-2"

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-semibold mb-4">Edit Project</h2>
            <form onSubmit={handleSave} className="max-w-md mx-auto">

                {/* 项目名称 */}
                <div className="mb-4">
                    <label htmlFor="title" className={titleStyle}>
                        Project Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* 项目描述 */}
                <div className="mb-4">
                    <label htmlFor="description" className={titleStyle}>
                        Description:
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-48"
                    ></textarea>
                </div>

                {/* 项目参与者 */}
                <div className="mb-4">
                    <h3 className={titleStyle}>Participants:</h3>
                    <Select
                        isMulti
                        options={options}
                        value={participants}
                        onChange={setParticipants}
                        components={animatedComponents}
                        closeMenuOnSelect={false}
                        placeholder="Select participants"
                    />
                </div>

                {/* 按钮 */}
                <div className="flex justify-center mt-4">

                    {/* 取消 */}
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-500 hover:bg-gray-700 
                        text-white font-bold py-2 px-4 rounded 
                        focus:outline-none focus:shadow-outline mr-2"
                    >
                        Cancel
                    </button>

                    {/* 提交 */}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 
                        text-white font-bold py-2 px-4 rounded 
                        focus:outline-none focus:shadow-outline mr-2"
                    >
                        Save
                    </button>

                </div>

            </form>
        </div>
    );
}

export default ProjectEdit