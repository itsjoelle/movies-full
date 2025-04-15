import React, { useEffect } from 'react';
import './TV.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPopular, getTopRated, getUpcoming } from '../state/data/dataSlice';
import CustomSlider from '../components/CustomSlider/CustomSlider';
import NoContent from '../components/NoContent/NoContent';
import Search from '../components/Search/Search';
import OuterWrapper from '../components/OuterWrapper/OuterWrapper';
import { AppDispatch, RootState } from '../state/store';

const TV = () => {
  const popular = useSelector((state: RootState) => state.data.popular);
  const upcoming = useSelector((state: RootState) => state.data.upcoming);
  const topRated = useSelector((state: RootState) => state.data.topRated);
  const search = useSelector((state: RootState) => state.search.searchTerm);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getPopular({ type: 'tv' }));
    dispatch(getUpcoming({ type: 'tv' }));
    dispatch(getTopRated({ type: 'tv' }));
  }, []);

  return (
    <div className="container-TV">
      <OuterWrapper />

      {search !== '' ? (
        <Search />
      ) : (
        <div className="data">
          {popular.length ? (
            <CustomSlider data={[popular, topRated, upcoming]} page={'tv'} />
          ) : (
            <NoContent />
          )}
        </div>
      )}
    </div>
  );
};

export default TV;
