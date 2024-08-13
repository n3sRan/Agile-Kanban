import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const usersUrl = 'http://127.0.0.1:7001/users';

// 获取用户列表
export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
    const response = await axios.get(usersUrl);
    return response.data;
});

// 注册用户
export const registerUser = createAsyncThunk('users/register',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(usersUrl, { username, password });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState: {
    users: [],
    loading: false,
    error: null,
    },
    extraReducers: (builder) => {
    builder
        .addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        state.error = null;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.error = null;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        })
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.users.push(action.payload);
            state.loading = false;
            state.error = null;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        });
    },
});

export default userSlice.reducer;