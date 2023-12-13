import { Action, configureStore } from '@reduxjs/toolkit';
import thunk, { ThunkAction } from 'redux-thunk';
import peopleReducer from '../slices/peopleSlice';
import genderCounterReducer from '../slices/genderSlice';

const store = configureStore({
  reducer: {
    people: peopleReducer,
    genderCounter: genderCounterReducer,
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;