import { useEffect, useRef } from 'react';
import './Home.scss';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../components/Search/Search';
import Banner from '../components/Banner/Banner';
import CustomSlider from '../components/CustomSlider/CustomSlider';
import { getTopRated, getTrending, getUpcoming } from '../state/data/dataSlice';

import { AppDispatch, RootState } from '../state/store';
import OuterWrapper from '../components/OuterWrapper/OuterWrapper';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const trending = useSelector((state: RootState) => state.data.trending);
  const upcoming = useSelector((state: RootState) => state.data.upcoming);
  const topRated = useSelector((state: RootState) => state.data.topRated);
  const search = useSelector((state: RootState) => state.search.searchTerm);

  useEffect(() => {
    dispatch(getTrending({ type: 'all' }));
    dispatch(getUpcoming({ type: 'movie' }));
    dispatch(getTopRated({ type: 'tv' }));
  }, []);

  function scrollTop() {
    return window.scrollTo(0, 0);
  }

  const toTopRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <div className="container-data">
      <span ref={toTopRef}></span>
      <OuterWrapper />
      {search !== '' ? (
        <div>
          <Search />
        </div>
      ) : (
        <>
          <Banner />
          <CustomSlider data={[trending, upcoming, topRated]} page={'home'} />
        </>
      )}
    </div>
  );
};

export default Home;
