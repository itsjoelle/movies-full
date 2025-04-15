import {
  PayloadAction,
  asyncThunkCreator,
  buildCreateSlice,
} from '@reduxjs/toolkit';

import axios from 'axios';
import { MOVIE_URL } from '../../constants';

const createSliceWithThunks = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  },
});

interface SearchResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface SearchState {
  searchTerm: string;
  searchResults: SearchResult[] | [];
  loading: boolean;
}

const initialStateSearch: SearchState = {
  searchTerm: '',
  searchResults: [],
  loading: false,
};

const searchSlice = createSliceWithThunks({
  name: 'search',
  initialState: initialStateSearch,
  reducers: (create) => ({
    updateSearch: create.reducer((state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    }),
    setSearchContent: create.asyncThunk(
      async (value: string) => {
        const result = await axios.get(
          `${MOVIE_URL}/search/movie?query=${value}&api_key=${
            import.meta.env.VITE_API_KEY
          }`
        );
        const resultArr = result.data.results;

        const filteredResultArr = resultArr.filter(
          (result: SearchResult) => result.poster_path
        );
        return filteredResultArr;
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state) => {
          state.loading = false;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.searchResults = action.payload;
        },
      }
    ),
  }),
});

export const { updateSearch, setSearchContent } = searchSlice.actions;

export default searchSlice.reducer;
