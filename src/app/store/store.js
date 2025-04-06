import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './slices/menuSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
  },
});
