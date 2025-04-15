import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { MOVIE_URL } from '../../constants';
import { RootState } from '../store';

interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

interface CastCrew {
  cast: Cast[];
}

interface SynData {
  id: number;
  overview: string;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
  original_name: string;
  number_of_episodes: number;
  homepage: string;
  origin_country: string[];
  number_of_seasons: number;
  runtime: number;
  genres: [];
}

interface Review {
  id: string;
  author: string;
  created_at: string;
  content: string;
}

interface ReviewData {
  results: Review[];
}

interface DataState {
  topRated: unknown[];
  upcoming: [];
  trending: [];
  popular: unknown[];
  synopsisData: SynData | null;
  synopsisLoading: boolean;
  genresLoaded: boolean;
  genres: [];
  castData: CastCrew | null;
  reviewData: ReviewData | null;
  trailer: '';
}

const initialState: DataState = {
  topRated: [],
  upcoming: [],
  trending: [],
  popular: [],
  synopsisData: null,
  synopsisLoading: true,
  genresLoaded: false,
  genres: [],
  castData: null,
  reviewData: null,
  trailer: '',
};

interface DataType {
  type: string;
  id?: string;
  genre?: string;
}

interface GenreObj {
  id: number;
  name: string;
}

interface MovieInput {
  id: number;
  genre_ids: number[];
  original_name?: string;
  original_title?: string;
  backdrop_path?: string;
}

interface MovieOutput {
  id: number;
  name: string | undefined;
  image: string;
  genres: string[];
}

export const getGenres = createAsyncThunk('data/genres', async () => {
  const {
    data: { genres },
  } = await axios.get(
    `${MOVIE_URL}/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}`
  );

  return genres;
});

const newArrayData = (
  array: MovieInput[],
  moviesArr: MovieOutput[],
  genres: GenreObj[] = []
) => {
  array.forEach((movie) => {
    const movieGenres: string[] = [];

    movie.genre_ids.forEach((genreId) => {
      const genreMatch = genres.find((g) => g.id === genreId);
      if (genreMatch) {
        movieGenres.push(genreMatch.name);
      }
    });

    if (movie.backdrop_path) {
      moviesArr.push({
        id: movie.id,
        name: movie.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
    }
  });
};

const getData = async (api: string, genres?: GenreObj[] | undefined) => {
  const moviesArr: [] = [];
  for (let i = 1; moviesArr.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}&page=${i}`);

    newArrayData(results, moviesArr, genres);
  }
  return moviesArr;
};

// get trending movies / series
export const getTrending = createAsyncThunk(
  'data/trending',
  async ({ type }: DataType, api) => {
    const {
      data: { genres },
    } = api.getState() as RootState;

    const data = await getData(
      `${MOVIE_URL}/trending/${type}/week?api_key=${
        import.meta.env.VITE_API_KEY
      }`,
      genres
    );

    return data;
  }
);

// get popular movies / series
export const getPopular = createAsyncThunk(
  'data/popular',
  async ({ type }: DataType, api) => {
    const {
      data: { genres },
    } = api.getState() as RootState;

    return getData(
      `${MOVIE_URL}/${type}/popular?api_key=${import.meta.env.VITE_API_KEY}`,
      genres
    );
  }
);

// get upcoming movies / on the air series
export const getUpcoming = createAsyncThunk(
  'data/upcoming',
  async ({ type }: DataType, api) => {
    const {
      data: { genres },
    } = api.getState() as RootState;
    if (type === 'tv') {
      return getData(
        `${MOVIE_URL}/${type}/on_the_air?api_key=${
          import.meta.env.VITE_API_KEY
        }`,
        genres
      );
    } else {
      return getData(
        `${MOVIE_URL}/${type}/upcoming?api_key=${import.meta.env.VITE_API_KEY}`,
        genres
      );
    }
  }
);

// get top rated movies / series
export const getTopRated = createAsyncThunk(
  'data/toprated',
  async ({ type }: DataType, api) => {
    const {
      data: { genres },
    } = api.getState() as RootState;

    return getData(
      `${MOVIE_URL}/${type}/top_rated?api_key=${import.meta.env.VITE_API_KEY}`,
      genres
    );
  }
);

// get the movies
export const getMovies = createAsyncThunk(
  'data/trending',
  async ({ type }: DataType, api) => {
    const {
      data: { genres },
    } = api.getState() as RootState;

    return getData(
      `${MOVIE_URL}/trending/${type}/week?api_key=${
        import.meta.env.VITE_API_KEY
      }`,
      genres
    );
  }
);

// get synopsis data
export const getSynopsisData = createAsyncThunk(
  'data/synopsis',
  async ({ id, type }: DataType) => {
    const { data } = await axios.get(
      `${MOVIE_URL}/${type}/${id}?api_key=${import.meta.env.VITE_API_KEY}`
    );

    return data;
  }
);

// get cast data
export const getCastData = createAsyncThunk(
  'data/cast',
  async ({ id, type }: DataType) => {
    const { data } = await axios.get(
      `${MOVIE_URL}/${type}/${id}/credits?api_key=${
        import.meta.env.VITE_API_KEY
      }`
    );

    return data;
  }
);

// get review data
export const getReviewData = createAsyncThunk(
  'data/reviews',
  async ({ id, type }: DataType) => {
    const { data } = await axios.get(
      `${MOVIE_URL}/${type}/${id}/reviews?api_key=${
        import.meta.env.VITE_API_KEY
      }`
    );

    return data;
  }
);

// get results genres by movie / tv (based on discover)
export const getDataByGenre = createAsyncThunk(
  'data/dataByGenres',
  async ({ genre, type }: DataType, api) => {
    const {
      data: { genres },
    } = api.getState() as RootState;
    const genreData = await getData(
      `${MOVIE_URL}/discover/${type}?api_key=${
        import.meta.env.VITE_API_KEY
      }&with_genres=${genre}`,
      genres
    );

    const genrePop = genreData.splice(0, 20);
    const genreRated = genreData.splice(20, 40);
    const genreArr = [genrePop, genreRated];
    return genreArr;
  }
);

// Slice for getting Data
const dataSlice = createSlice({
  name: 'Data',
  initialState,
  reducers: {
    resetSynopsisData: (state) => {
      state.synopsisData = null;
      state.synopsisLoading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(getTrending.fulfilled, (state, action) => {
      state.trending = action.payload;
    });
    builder.addCase(getUpcoming.fulfilled, (state, action) => {
      state.upcoming = action.payload;
    });
    builder.addCase(getTopRated.fulfilled, (state, action) => {
      state.topRated = action.payload;
    });
    builder.addCase(getPopular.fulfilled, (state, action) => {
      state.popular = action.payload;
    });
    builder.addCase(getDataByGenre.fulfilled, (state, action) => {
      state.popular = action.payload[0];
      state.topRated = action.payload[1];
    });

    builder.addCase(getSynopsisData.pending, (state) => {
      state.synopsisLoading = true;
    });
    builder.addCase(getSynopsisData.fulfilled, (state, action) => {
      state.synopsisData = action.payload;
      state.synopsisLoading = false;
    });
    builder.addCase(getCastData.fulfilled, (state, action) => {
      state.castData = action.payload;
    });
    builder.addCase(getReviewData.fulfilled, (state, action) => {
      state.reviewData = action.payload;
    });
  },
});

export const { resetSynopsisData } = dataSlice.actions;

export default dataSlice.reducer;
