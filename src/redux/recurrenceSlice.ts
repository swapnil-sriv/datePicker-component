import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface RecurrenceState {
  type: RecurrenceType;
  interval: number;
  selectedDays: string[];
  pattern: string;
  startDate: string;
  endDate?: string;
}

const initialState: RecurrenceState = {
  type: 'daily',
  interval: 1,
  selectedDays: [],
  pattern: '',
  startDate: '',
  endDate: '',
};

const recurrenceSlice = createSlice({
  name: 'recurrence',
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<RecurrenceType>) => {
      state.type = action.payload;
    },
    setInterval: (state, action: PayloadAction<number>) => {
      state.interval = action.payload;
    },
    setSelectedDays: (state, action: PayloadAction<string[]>) => {
      state.selectedDays = action.payload;
    },
    setPattern: (state, action: PayloadAction<string>) => {
      state.pattern = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
  },
});

export const {
  setType,
  setInterval,
  setSelectedDays,
  setPattern,
  setStartDate,
  setEndDate,
} = recurrenceSlice.actions;


export default recurrenceSlice.reducer;
