import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, fetchUsers } from '../store/modules/userStore';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const users = useSelector(state => state.users.users);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // 占位
        if (username === 'admin') {
            alert('Username already exists');
            return;
        }

        const userExists = users.some((user) => user.username === username);
        if (userExists) {
            alert('Username already exists');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }


        await dispatch(registerUser({ username, password })).then(() => {
            alert('Registered Successfully');
            console.log('Registered Successfully');
            navigate('/login');
        }).catch(error => {
            console.error('Error:', error);
        });


    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="register-container bg-white shadow-lg rounded px-12 pt-10 pb-10 mb-4 flex-1">
                <h2 className="text-center text-4xl font-bold mb-6">Agile Kanban</h2>
                <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mt-10">

                    {/* 用户名 */}
                    <div className="form-group">
                        <label htmlFor="username" className="block text-gray-700 text-md font-bold mb-2"></label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    {/* 密码 */}
                    <div className="form-group">
                        <label htmlFor="password" className="block text-gray-700 text-md font-bold mb-2"></label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    {/* 确认密码 */}
                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="block text-gray-700 text-md font-bold mb-2"></label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    {/* 提交注册 */}
                    <div className="flex items-center justify-center mt-4">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Register
                        </button>
                    </div>

                    {/* 取消 */}
                    <div className="flex items-center justify-center mt-4">
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Cancel
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Register;