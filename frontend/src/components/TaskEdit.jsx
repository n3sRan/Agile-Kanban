import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateTask, fetchTasks } from '../store/modules/taskStore';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const TaskEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { back } = useParams();

    // 获取当前任务
    const { taskId } = useParams();
    const tasks = useSelector(state => state.tasks.tasks);
    const task = tasks.find(task => task.id === taskId);

    // 获取可供选择的任务负责人
    const project = useSelector(state => state.projects.projects.find(project => project.id === task.projectId));
    const participants = project ? project.participants : [];

    const status = ['NOT START', 'PROGRESSING', 'COMPLETED', 'REVIEWED'];

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    // 处理返回
    const goBack = () => {

        if (back === "list") {
            navigate(`/dashboard/projects/${task.projectId}/tasks`, { replace: true })
        } else {
            navigate(`/dashboard/projects/${task.projectId}/tasks/${taskId}`, { replace: true })
        }

    }

    // 处理提交
    const handleSave = () => {
        dispatch(updateTask({
            ...task,
            title,
            description,
            status: statusState.value,
            assignedTo: assignedTo.value
        })).then(() => {
            alert("Saved.");
            dispatch(fetchTasks(task.projectId));
            console.log("Updated Tasks.")
            goBack();
        }).catch(error => {
            console.error('Error updating task:', error);
        });
    };


    // 获取选项内容
    const formatParticipantsAsOptions = (participants) => {
        return participants.map((participant) => ({
            value: participant,
            label: participant,
        }));
    };
    const options = formatParticipantsAsOptions(participants);
    const statusOptions = formatParticipantsAsOptions(status);
    const [assignedTo, setAssignedTo] = useState(options.find(option => option.value === task.assignedTo));
    const [statusState, setStatusState] = useState(statusOptions.find(option => option.value === task.status));
    // 增加动画
    const animatedComponents = makeAnimated();

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">

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

            {/* 任务状态 */}
            <div className="mb-4">
                <h3 className="block text-gray-700 text-sm font-bold mb-2">Status:</h3>
                <Select
                    options={statusOptions}
                    value={statusState}
                    onChange={setStatusState}
                    components={animatedComponents}
                    placeholder="Select status of the task"
                />
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
            <div className="flex justify-end">

                {/* 取消按钮 */}
                <button
                    type="button"
                    onClick={goBack}
                    className="bg-gray-500 hover:bg-gray-700 
                    text-white font-bold py-2 px-4 rounded 
                    focus:outline-none focus:shadow-outline mr-2"
                >
                    Cancel
                </button>

                {/* 提交按钮 */}
                <button
                    type="button"
                    onClick={handleSave}
                    className="bg-blue-500 hover:bg-blue-700 
                    text-white font-bold py-2 px-4 rounded 
                    focus:outline-none focus:shadow-outline"
                >
                    Save
                </button>
            </div>
        </div>
    );
}

export default TaskEdit