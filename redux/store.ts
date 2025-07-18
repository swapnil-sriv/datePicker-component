import { configureStore } from '@reduxjs/toolkit';
import recurrenceReducer from './recurrenceSlice';

export const store = configureStore({
  reducer: {
    recurrence: recurrenceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
