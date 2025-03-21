import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from '../features/items/itemsSlice';

export const Store = configureStore({
  reducer: {
    items: itemsReducer,
  },
});
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;