import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit';
import axios from 'axios';

const tasksUrl = 'http://127.0.0.1:7001/tasks';

// 获取任务列表
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (projectId, {
    rejectWithValue
}) => {
    try {
        const response = await axios.get(`${tasksUrl}/projects/${projectId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// 新增任务
export const createTask = createAsyncThunk('tasks/createTask', async (taskData, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${tasksUrl}/projects/${taskData.projectId}`, taskData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// 更新任务
export const updateTask = createAsyncThunk('tasks/updateTask', async (taskData, {
    rejectWithValue
}) => {
    try {
        const response = await axios.put(`${tasksUrl}/${taskData.id}`, taskData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// 删除任务
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId, {
    rejectWithValue
}) => {
    try {
        const response = await axios.delete(`${tasksUrl}/${taskId}`);
        return taskId;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.tasks = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(createTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(createTask.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(updateTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex((task) => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
                state.loading = false;
                state.error = null;
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(task => task.id === action.payload);
                if (index !== -1) {
                    state.tasks.splice(index, 1);
                }
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export default taskSlice.reducer;