import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit';
import axios from 'axios';

const attachmentsUrl = 'http://127.0.0.1:7001/api/upload';

// 上传附件
export const uploadAttachment = createAsyncThunk('attachments/uploadAttachment', async (formData, {
    rejectWithValue
}) => {
    try {
        const response = await axios.post(`${attachmentsUrl}`, formData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// 获取附件列表
export const fetchAttachments = createAsyncThunk('attachments/fetchAttachments', async (_, {
    rejectWithValue
}) => {
    try {
        const response = await axios.get(`${attachmentsUrl}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// 删除附件
export const deleteAttachment = createAsyncThunk(
    'attachments/deleteAttachment',
    async (id, {
        rejectWithValue
    }) => {
        try {
            const response = await axios.delete(`${attachmentsUrl}/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const attachmentSlice = createSlice({
    name: 'attachments',
    initialState: {
        attachments: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadAttachment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadAttachment.fulfilled, (state, action) => {
                state.attachments.push(action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(uploadAttachment.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(fetchAttachments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAttachments.fulfilled, (state, action) => {
                state.attachments = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchAttachments.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(deleteAttachment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAttachment.fulfilled, (state, action) => {
                const deletedId = action.payload.id;
                state.attachments = state.attachments.filter((attachment) => attachment.id !== deletedId);
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteAttachment.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export default attachmentSlice.reducer;