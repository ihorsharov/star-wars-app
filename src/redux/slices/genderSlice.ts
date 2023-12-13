import { Action, PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface GenderCounterState {
  male: number;
  female: number;
  other: number;
}

const initialState: GenderCounterState = {
  male: 0,
  female: 0,
  other: 0,
};

const genderSlice = createSlice({
  name: 'genderCounter',
  initialState,
  reducers: {
    incrementCounter: (state, {payload: gender}: PayloadAction<string>) => {
      if (gender === 'male' || gender === 'female') {
        state[gender]++;
      } else {
        state.other = Math.max(state.other + 1, 0);
      }
    },
    decrementCounter: (state, {payload: gender}: PayloadAction<string>) => {
      if (gender === 'male' || gender === 'female') {
        state[gender] = Math.max(state[gender] - 1, 0); 
      } else {
        state.other = Math.max(state.other - 1, 0);
      }
    },
    resetCounters: (state) => {
      state.male = 0;
      state.female = 0;
      state.other = 0;
    },
  },
});

export const { incrementCounter, decrementCounter, resetCounters } = genderSlice.actions;
export default genderSlice.reducer;
