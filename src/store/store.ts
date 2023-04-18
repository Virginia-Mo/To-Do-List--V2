import { configureStore } from '@reduxjs/toolkit';
import todoSlice from '../reducers/todoReducer';

const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
})

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>

export default store