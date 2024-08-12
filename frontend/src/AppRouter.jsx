import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProjectList from './components/ProjectList';
import NewProject from './components/NewProject';
import ProjectEdit from './components/ProjectEdit';
import ProjectDetail from './components/ProjectDetail';
import TaskList from './components/TaskList';
import NewTask from './components/NewTask';
import TaskEdit from './components/TaskEdit';
import TaskDetail from './components/TaskDetail';
import CommentList from './components/CommentList';
import AttachmentList from './components/AttachmentList';
import NotFound from './components/NotFound';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                {/* 登录界面 */}
                <Route path="/login" element={<Login />} />
                {/* 注册界面 */}
                <Route path="/register" element={<Register />} />
                {/* 主界面 */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />}>
                    {/* 二级路由：项目列表 */}
                    <Route index element={<ProjectList />} /> {/* 默认子路由 */}
                    <Route path="projects" element={<ProjectList />} />
                    {/* 二级路由：新建项目 */}
                    <Route path="projects/new" element={<NewProject />} />
                    {/* 二级路由：编辑项目 */}
                    <Route path="projects/:projectId/edit/:back" element={<ProjectEdit />}></Route>
                    {/* 二级路由：项目详情 */}
                    <Route path="projects/:projectId" element={<ProjectDetail />}>
                        {/* 三级路由：任务列表 */}
                        <Route index element={<TaskList />} />
                        <Route path="tasks" element={<TaskList />} />
                        {/* 三级路由：新建任务 */}
                        <Route path="tasks/new" element={<NewTask />} />
                        {/* 三级路由：编辑任务 */}
                        <Route path="tasks/:taskId/edit/:back" element={<TaskEdit />} />
                        {/* 三级路由：任务详情 */}
                        <Route path="tasks/:taskId" element={<TaskDetail />}>
                            {/* 四级路由：任务评论 */}
                            <Route index element={<CommentList />} />
                            <Route path="comment" element={<CommentList />} />
                            {/* 四级路由：任务附件 */}
                            <Route path="attachment" element={<AttachmentList />} />
                        </Route>
                    </Route>
                </Route>
                {/* 404界面 */}
                <Route path="/not-found" element={<NotFound />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;