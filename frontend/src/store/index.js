import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './modules/loginStore';
import projectReducer from './modules/projectStore';
import userStore from './modules/userStore';
import taskStore from './modules/taskStore';
import commentStore from './modules/commentStore';
import attachmentStore from './modules/attachmentStore';

const store = configureStore({
    reducer: {
    login: loginReducer,
    users: userStore,
    projects: projectReducer,
    tasks: taskStore,
    comments: commentStore,
    attachments:attachmentStore,
    },
});

export default store;