import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './data/dataSlice';
import searchSlice from './search/searchSlice';
import geminiSlice from './gemini/geminiSlice';
import authSlice from './auth/authSlice';

export const store = configureStore({
  reducer: {
    data: dataSlice,
    auth: authSlice,
    search: searchSlice,
    gemini: geminiSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
