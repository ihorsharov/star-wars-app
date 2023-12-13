import { createAsyncThunk } from "@reduxjs/toolkit";
import { Character } from "../slices/peopleSlice";

interface ApiData {
    results: Array<Character>;
    count: number;
  }
  
export const fetchPeople = createAsyncThunk<ApiData, number>(
    "people/fetchPeople",
    async (page) => {
      const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
      const data = await response.json();
      return { results: data.results, count: data.count };
    }
  );