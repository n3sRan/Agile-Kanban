import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const usersUrl = 'http://127.0.0.1:7001/users';

export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
    const response = await axios.get(usersUrl);
    return response.data;
});

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
        });
    },
});

export default userSlice.reducer;