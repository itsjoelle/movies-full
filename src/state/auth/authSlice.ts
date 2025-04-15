import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  status: 'idle',
};

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const response = await fetch('http://localhost:5005/auth/status', {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Not authenticated');
  }

  const data = await response.json();
  return data.isAuthenticated;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loggedIn = action.payload;
        state.status = 'succeeded';
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loggedIn = false;
        state.status = 'failed';
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
