import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../store/modules/loginStore'
import axios from 'axios';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginUrl = 'http://127.0.0.1:7001/users/login'
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(loginUrl, { username, password });
            const user = { username };
            dispatch(login(user));
            console.log(`登录成功, Username: ${username}, Password:${password}, ${response.data}`);
            navigate('/dashboard', { replace: true });
        } catch (error) {
            alert('登录失败');
            console.error('登录失败:', error);
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="login-container bg-white shadow-lg rounded px-12 pt-10 pb-10 mb-4 flex-1">
                <h2 className="text-center text-4xl font-bold mb-6">Agile Kanban</h2>

                <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mt-10">

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

                    <div className="form-group">
                        <label htmlFor="password" className="block text-gray-700 text-md font-bold mb-2"></label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="flex items-center justify-center mt-4">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Login
                        </button>
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <Link to="/register" className="text-blue-500 hover:underline">
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login