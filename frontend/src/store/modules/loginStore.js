import { createSlice } from '@reduxjs/toolkit';

const loginStore = createSlice({
    name: 'login',
    initialState: {
    isLoggedIn: false,
    user: null,
    },
    reducers: {
    login: (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
    },
    logout: (state) => {
        state.isLoggedIn = false;
        state.user = null;
    },
    },
});

// 解构出action creators
const { login, logout } = loginStore.actions;
// 获取reducer
const reducer = loginStore.reducer;

// 以按需导出的方式导出action creators
export { login, logout };
// 以默认导出的方式导出reducer
export default reducer;