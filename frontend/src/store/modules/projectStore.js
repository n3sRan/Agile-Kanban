import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const projectsUrl = 'http://127.0.0.1:7001/projects';

// 获取项目列表
export const fetchProjects = createAsyncThunk('projects/fetchAll', async () => {
    const response = await axios.get(projectsUrl);
    return response.data;
});

// 新增项目
export const createProject = createAsyncThunk('projects/create', async (projectData, { rejectWithValue }) => {
    try {
    const response = await axios.post(projectsUrl, projectData);
    return response.data;
    } catch (error) {
    return rejectWithValue(error.response.data);
    }
});

// 更新项目
export const updateProject = createAsyncThunk('projects/update', async (projectData, {
    rejectWithValue
}) => {
    try {
        const response = await axios.put(`${projectsUrl}/${projectData.id}`, projectData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// 删除项目
export const deleteProject = createAsyncThunk('projects/delete', async (projectId, {rejectWithValue}) => {
    try {
        const response = await axios.delete(`${projectsUrl}/${projectId}`);
        return projectId;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


const projectSlice = createSlice({
    name: 'projects',
    initialState: {
    projects: [],
    loading: false,
    error: null,
    },
    extraReducers: (builder) => {
    builder
        .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.loading = false;
        state.error = null;
        })
        .addCase(fetchProjects.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        })
        .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(createProject.fulfilled, (state, action) => {
            state.projects.push(action.payload);
            state.loading = false;
            state.error = null;
        })
        .addCase(createProject.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
        .addCase(updateProject.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateProject.fulfilled, (state, action) => {
            const index = state.projects.findIndex((project) => project.id === action.payload.id);
            if (index !== -1) {
                state.projects[index] = action.payload;
            }
            state.loading = false;
            state.error = null;
        })
        .addCase(updateProject.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
        .addCase(deleteProject.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteProject.fulfilled, (state, action) => {
            const index = state.projects.findIndex(project => project.id === action.payload);
            if (index !== -1) {
                state.projects.splice(index, 1);
            }
            state.loading = false;
            state.error = null;
        })
        .addCase(deleteProject.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        });
    },
    });

export default projectSlice.reducer;