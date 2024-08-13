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

const { login, logout } = loginStore.actions;
const reducer = loginStore.reducer;

export { login, logout };
export default reducer;