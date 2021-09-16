import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  currentUser: JSON.parse(localStorage.getItem('user')) || undefined
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFail(state) {
      state.loading = false;
      state.currentUser = undefined;
    },
    logout(state) {
      state.currentUser = undefined;
    }
  }
});

const { reducer } = authSlice;

export const { login, loginSuccess, loginFail, logout } = authSlice.actions;

export default reducer;
