import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createTask } from '../store/modules/taskStore';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { v4 as uuidv4 } from 'uuid';


const NewTask = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // 获取项目id
    const { projectId } = useParams();
    // 获取当前项目的参与者以供选择任务负责人
    const project = useSelector(state => state.projects.projects.find(project => project.id === projectId));
    const participants = project ? project.participants : [];

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState(null);

    // 处理提交
    const handleSubmit = (event) => {
        event.preventDefault();

        const date = new Date();

        if (!assignedTo) {
            alert("Please select a participant to assign the task.");
            return;
        }

        dispatch(createTask({
            id: uuidv4(),
            projectId,
            title,
            description,
            status: "NOT START",
            assignedTo: assignedTo.value,
            createdAt: date,
            updatedAt: date
        }));

        // 重定向至任务列表
        alert("Task Created Successfully");
        navigate(`/dashboard/projects/${projectId}/tasks`);
    };

    // 处理取消
    const handleCancel = () => {
        setTitle('');
        setDescription('');
        setAssignedTo([]);
        navigate(`/dashboard/projects/${projectId}/tasks`);
    };


    // 准备选项格式
    const formatParticipantsAsOptions = (participants) => {
        return participants.map((participant) => ({
            value: participant,
            label: participant,
        }));
    };

    // 下拉列表的选项 - 项目参与者 （包括项目创建者）
    const options = formatParticipantsAsOptions(participants);
    const animatedComponents = makeAnimated();

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-semibold mb-4">Create New Task</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">

                {/* 任务名称 */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                        Task Title:
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

                {/* 任务描述 */}
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

                {/* 任务负责人 */}
                <div className="mb-4">
                    <h3 className="block text-gray-700 text-sm font-bold mb-2">Assign To:</h3>
                    <Select
                        options={options}
                        value={assignedTo}
                        onChange={setAssignedTo}
                        components={animatedComponents}
                        placeholder="Select participant to assign"
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
                        focus:outline-none focus:shadow-outline"
                    >
                        Create
                    </button>

                </div>

            </form>
        </div>
    );
};

export default NewTask;