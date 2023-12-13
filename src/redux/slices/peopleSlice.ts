import { createSlice } from "@reduxjs/toolkit";
import { fetchPeople } from "../thunks/peopleThunk";

export interface Character {
    name: string
    height: string
    mass: string
    hair_color: string
    skin_color: string
    eye_color: string
    birth_year: string
    gender: string
    homeworld: string
    films: string[]
    species: string[]
    vehicles: string[]
    starships: string[]
    created: string
    edited: string
    url: string
}

interface PeopleState {
  results: Array<Character>;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: PeopleState = {
  results: [],
  status: "idle",
  error: null,
  currentPage: 1,
  totalPages: 1,
};

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPeople.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload.results;
        state.currentPage = action.meta.arg; 
        state.totalPages = Math.ceil(action.payload.count / 10);
      });
  },
});

export const { reducer } = peopleSlice;
export default peopleSlice.reducer;
