import React, { useEffect } from 'react';
import './Movies.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  getGenres,
  getPopular,
  getTopRated,
  getUpcoming,
} from '../state/data/dataSlice';
import CustomSlider from '../components/CustomSlider/CustomSlider';
import NoContent from '../components/NoContent/NoContent';
import SelectGenre from '../components/SelectGenre/SelectGenre';
import Search from '../components/Search/Search';
import OuterWrapper from '../components/OuterWrapper/OuterWrapper';
import { AppDispatch, RootState } from '../state/store';

const Movies = () => {
  const genresLoaded = useSelector(
    (state: RootState) => state.data.genresLoaded
  );
  const popular = useSelector((state: RootState) => state.data.popular);
  const upcoming = useSelector((state: RootState) => state.data.upcoming);
  const topRated = useSelector((state: RootState) => state.data.topRated);
  const search = useSelector((state: RootState) => state.search.searchTerm);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(getPopular({ type: 'movie' }));
      dispatch(getUpcoming({ type: 'movie' }));
      dispatch(getTopRated({ type: 'movie' }));
    }
  }, [genresLoaded]);

  return (
    <div className="container-movies">
      <OuterWrapper />
      {search !== '' ? (
        <Search />
      ) : (
        <div className="data">
          <SelectGenre type={'movie'} />
          {popular.length ? (
            <CustomSlider data={[popular, topRated, upcoming]} page={'movie'} />
          ) : (
            <NoContent />
          )}
        </div>
      )}
    </div>
  );
};

export default Movies;
