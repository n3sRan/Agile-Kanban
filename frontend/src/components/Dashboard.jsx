import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { logout } from "../store/modules/loginStore";

const Dashboard = () => {
    // 读取登录状态
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    // 读取当前登录的用户
    const username = useSelector(state => state.login.user?.username || 'User');
    const navigate = useNavigate();
    const [greeting, setGreeting] = useState("Welcome");

    const dispatch = useDispatch();

    // 确定问候语
    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour >= 5 && currentHour < 12) {
            setGreeting("Good morning");
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting("Good afternoon");
        } else {
            setGreeting("Good evening");
        }
    }, []);

    // 检查登录状态
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login', { replace: true });
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="min-h-screen  flex flex-col">

            <header className="bg-white">
                <div className="container mx-auto flex justify-between items-center px-3">

                    {/* 问候语 */}
                    <h1 className="text-4xl font-bold text-gray-800 mt-2 mb-4 mr-4">{greeting}, {username}!</h1>
                    {/* 导航栏 */}
                    <nav className="flex space-x-4">
                        {/* 项目列表 */}
                        <Link to="/dashboard/projects" className="text-gray-600 hover:text-gray-900">
                            <button className="border border-gray-300 px-4 py-2 rounded-md">Projects List</button>
                        </Link>
                        {/* 新增项目 */}
                        <Link to="/dashboard/projects/new" className="text-gray-600 hover:text-gray-900">
                            <button className="border border-gray-300 px-4 py-2 rounded-md">New Project</button>
                        </Link>
                        {/* 设置 */}
                        <Link to="/settings" className="text-gray-600 hover:text-gray-900">
                            <button className="border border-gray-300 px-4 py-2 rounded-md">Settings</button>
                        </Link>
                        {/* 登出 */}
                        <button onClick={() => {
                            dispatch(logout());
                        }} className="border border-gray-300 px-4 py-2 rounded-md">Logout</button>

                    </nav>
                </div>
            </header>

            <main className="flex-1 bg-white">
                <div className="p-6">
                    <Outlet />
                </div>
            </main>

            <footer className="bg-white text-gray-600">
                <div className="container mx-auto text-center py-4">
                    <p>&copy; 2024 Ly Ou. All rights reserved.</p>
                </div>
            </footer>

        </div>
    );
};

export default Dashboard;