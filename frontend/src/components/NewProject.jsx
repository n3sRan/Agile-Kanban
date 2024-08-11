import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../store/modules/projectStore';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { fetchUsers } from '../store/modules/userStore';
import { fetchProjects } from '../store/modules/projectStore';
import { v4 as uuidv4 } from 'uuid';


const NewProject = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // 获取当前登录的用户名
    const currentUser = useSelector(state => state.login.user?.username || 'User');
    // 获取所有用户列表以供选择项目参与者
    const users = useSelector(state => state.users.users);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [participants, setParticipants] = useState([]);

    // 在组件加载时获取用户列表
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    //处理提交
    const handleSubmit = (event) => {
        event.preventDefault();

        // 将value数组转换为参与者名称数组以供传参
        const participantNames = participants.map(participant => participant.value);

        // 把项目创建者也加入其中
        participantNames.push(currentUser);
        dispatch(createProject({
            id: uuidv4(),
            title,
            description,
            createdAt: new Date(),
            createdBy: currentUser,
            participants: participantNames
        }));
        alert("Project Created Successfully");

        // 更新项目列表
        dispatch(fetchProjects());
        console.log("Updated Project List.")
        navigate('/dashboard/projects', { replace: true });
    };

    // 处理取消
    const handleCancel = () => {
        setTitle('');
        setDescription('');
        setParticipants([]);
        navigate('/dashboard/projects');
    };

    // 准备选项格式
    const formatUsersAsOptions = (users) => {
        return users.map((user) => ({
            // 使用username作为value和label
            value: user.username,
            label: user.username,
        }));
    };
    //下拉列表的选项-可选用户
    const options = formatUsersAsOptions(users).filter(user => user.value !== currentUser); // 过滤掉当前登录的用户
    // 添加动画
    const animatedComponents = makeAnimated();

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-semibold mb-4">Create New Project</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">

                {/* 项目名称 */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
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
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
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
                    <h3 className="block text-gray-700 text-sm font-bold mb-2">Participants:</h3>
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
                        Create
                    </button>

                </div>

            </form>
        </div>
    );
};

export default NewProject;