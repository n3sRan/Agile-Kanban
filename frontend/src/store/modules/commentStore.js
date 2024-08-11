import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit';
import axios from 'axios';

const commentsUrl = 'http://127.0.0.1:7001/comments';

// 获取评论列表
export const fetchComments = createAsyncThunk('comments/fetchComments', async (taskId, {
    rejectWithValue
}) => {
    try {
        const response = await axios.get(`${commentsUrl}/${taskId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// 新增评论
export const createComment = createAsyncThunk('comments/createComment', async (commentData, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${commentsUrl}/${commentData.taskId}`, commentData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// 删除评论
export const deleteComment = createAsyncThunk('comments/deleteComment', async (commentId, {
    rejectWithValue
}) => {
    try {
        const response = await axios.delete(`${commentsUrl}/${commentId}`);
        return commentId;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// 点赞评论
export const likeComment = createAsyncThunk('comments/likeComment', async (commentId, {
    rejectWithValue
}) => {
    try {
        const response = await axios.put(`${commentsUrl}/likes/${commentId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.comments = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(createComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.comments.push(action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(createComment.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(deleteComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                const index = state.comments.findIndex(comment => comment.id === action.payload);
                if (index !== -1) {
                    state.comments.splice(index, 1);
                }
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(likeComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(likeComment.fulfilled, (state, action) => {
                const index = state.comments.findIndex(comment => comment.id === action.payload.id);
                if (index !== -1) {
                    state.comments[index] = action.payload;
                }
                state.loading = false;
                state.error = null;
            })
            .addCase(likeComment.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export default commentSlice.reducer;