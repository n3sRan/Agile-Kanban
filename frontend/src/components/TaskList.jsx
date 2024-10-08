import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTasks } from '../store/modules/taskStore';
import TaskItem from './TaskItem';


const TaskList = () => {
    const { projectId } = useParams();
    const dispatch = useDispatch();

    // 获取任务列表
    const tasks = useSelector((state) => state.tasks.tasks);
    const loading = useSelector((state) => state.tasks.loading);
    const error = useSelector((state) => state.tasks.error);

    // 获取当前登录的用户
    const currentUser = useSelector(state => state.login.user?.username || 'NOT LOGGED IN');

    useEffect(() => {
        dispatch(fetchTasks(projectId)).then(() => {
            console.log("Loaded tasks at Task List.")
        });
    }, [dispatch, projectId]);

    const tabs = [
        { type: 'all', text: 'All Tasks' },
        { type: 'my', text: 'My Tasks' },
        { type: 'todo', text: 'Unfinished' },
    ]

    const [type, setType] = useState('all');

    const handleTabChange = (type) => {
        console.log(`Task List at Type: ${type}`);
        setType(type)
    }

    // 渲染
    if (loading) {
        return (
            <div className="flex items-center justify-center mt-16 mb-16">
                <div className="animate-pulse w-16 h-16 bg-gray-200 rounded-full"></div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="text-center mt-16 mb-16 text-red-500">
                <h3 className="text-lg font-bold mb-2">{error}</h3>
                <p>Please try refreshing the page.</p>
            </div>
        );
    }

    return (
        <div className="mt-4 mb-4">

            {/* 标题 */}
            <h2 className="text-3xl font-bold mb-4">
                Tasks
            </h2>

            {/* 导航 */}
            <div className='flex justify-start'>
                {tabs.map(item =>
                    <button
                        key={item.type}
                        onClick={() => handleTabChange(item.type)}
                        className={`text-lg text-white hover:text-white font-bold py-2 px-4 rounded mr-2 mb-2
                        ${type === item.type ? 'bg-yellow-300 hover:bg-yellow-500' : 'bg-gray-500 hover:bg-gray-700'}`}>
                        {item.text}
                    </button>
                )}
            </div>

            {/* 任务 */}
            {type === 'all' && (tasks.length === 0 ? (
                <div className="text-center mt-16 mb-16">
                    <h3 className="text-lg font-bold mb-2">
                        No tasks found.
                    </h3>
                    <p>Create one by clicking the "New Task" button.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {tasks.map(task => (
                        <div key={task.id}>
                            <TaskItem task={task} currentUser={currentUser} dispatch={dispatch} />
                        </div>
                    ))}
                </div>
            ))}

            {type === 'my' && ((tasks.filter(task => task.assignedTo === currentUser)).length === 0 ? (
                <div className="text-center mt-16 mb-16">
                    <h3 className="text-lg font-bold mb-2">
                        No tasks found.
                    </h3>
                </div>
            ) : (
                <div className="space-y-4">
                    {(tasks.filter(task => task.assignedTo === currentUser)).map(task => (
                        <div key={task.id}>
                            <TaskItem task={task} currentUser={currentUser} dispatch={dispatch} />
                        </div>
                    ))}
                </div>
            ))}

            {type === 'todo' && ((tasks.filter(task => (task.status === 'NOT START' || task.status === 'PROGRESSING'))).length === 0 ? (
                <div className="text-center mt-16 mb-16">
                    <h3 className="text-lg font-bold mb-2">
                        No tasks found.
                    </h3>
                </div>
            ) : (
                <div className="space-y-4">
                    {(tasks.filter(task => (task.status === 'NOT START' || task.status === 'PROGRESSING'))).map(task => (
                        <div key={task.id}>
                            <TaskItem task={task} currentUser={currentUser} dispatch={dispatch} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default TaskList;