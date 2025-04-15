import React, { useEffect, useRef } from 'react';
import Search from '../components/Search/Search';
import { IoIosStarOutline } from 'react-icons/io';
import {
  getCastData,
  getReviewData,
  getSynopsisData,
  resetSynopsisData,
} from '../state/data/dataSlice';
import { useDispatch, useSelector } from 'react-redux';
import './Synopsis.scss';
import { useNavigate } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import Reviews from '../components/Reviews/Reviews';
import { AppDispatch, RootState } from '../state/store';
import OuterWrapper from '../components/OuterWrapper/OuterWrapper';
import NoContent from '../components/NoContent/NoContent';
import { getIdThroughURL } from '../utils/getSynopsisData';

const Synopsis = () => {
  const search = useSelector((state: RootState) => state.search.searchTerm);
  const data = useSelector((state: RootState) => state.data.synopsisData);
  const castData = useSelector((state: RootState) => state.data.castData);
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const synopsisLoading = useSelector(
    (state: RootState) => state.data.synopsisLoading
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLInputElement>(null);

  let shownCastData;
  const castList: string[] = [];
  let castListStr;

  if (castData?.cast) {
    castData.cast;
    shownCastData = castData?.cast.slice(0, 6);

    shownCastData.map((item) => {
      castList.push(item.name);
    });
    castListStr = castList.join(', ');
  }

  const { type, id } = getIdThroughURL();

  useEffect(() => {
    dispatch(resetSynopsisData());
    dispatch(getCastData({ id: id, type: type }));
    dispatch(getSynopsisData({ id: id, type: type }));
    dispatch(getReviewData({ id: id, type: type }));

    return () => {
      dispatch(resetSynopsisData());
    };
  }, []);

  const handleFavorize = async () => {
    if (!loggedIn) {
      return;
    }
    const url = window.location.href;

    const category = url.includes('/movie') ? 'movie' : 'tv';
    const dataObject = { ...data, category: category };

    try {
      const response = await fetch('http://localhost:5005/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(dataObject),
      });
    } catch (error) {
      console.log(error);
      throw new Error('Failed to favorize movie');
    }
  };

  return (
    <div className="container-synopsis">
      <OuterWrapper />
      {search !== '' ? (
        <Search />
      ) : (
        <div className="synopsis-wrapper">
          {synopsisLoading && !data?.poster_path ? (
            <NoContent />
          ) : (
            <>
              <div className="main-content">
                <div className="header-section">
                  <div className="poster">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
                      alt="Movie Poster"
                    />
                  </div>
                  <div className="main-info">
                    <h1>
                      {type === 'movie' ? data?.title : data?.original_name}
                    </h1>
                    <p className="tagline">
                      {data?.tagline || data?.original_name}
                    </p>
                    <p
                      className="overview"
                      style={
                        data!.overview!.length > 300
                          ? { maxWidth: data!.overview.length * 1.5 }
                          : {}
                      }
                    >
                      {data?.overview}
                    </p>

                    <div className="meta-section">
                      {type !== 'movie' && (
                        <div>
                          <strong>Seasons:</strong> `${data?.number_of_seasons}{' '}
                          Seasons
                        </div>
                      )}

                      {type !== 'movie' && (
                        <div>
                          <strong>Episodes:</strong>{' '}
                          {type === 'movie'
                            ? 'N/A'
                            : `${data?.number_of_episodes} Episodes`}
                        </div>
                      )}

                      <div>
                        <strong>Origin:</strong> {data?.origin_country || 'N/A'}
                      </div>
                      {data?.homepage && (
                        <div>
                          <a
                            href={data.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link"
                          >
                            Visit Official Website
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="action-buttons">
                      <button
                        onClick={() => navigate('/player')}
                        className="primary-button"
                      >
                        <div className="play-icon">
                          <FaPlay />
                        </div>
                        <span>Watch Trailer</span>
                      </button>
                      <button
                        className="secondary-button"
                        onClick={handleFavorize}
                      >
                        <IoIosStarOutline size={25} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="cast-genres-section">
                  {castListStr && (
                    <div className="cast-section">
                      <h2>Cast</h2>
                      <p>{castListStr}</p>
                    </div>
                  )}
                  {data?.genres?.length && (
                    <div className="genres-section">
                      <h2>Genres</h2>
                      <div className="genres">
                        {data.genres.map((genre) => (
                          <span key={genre.id}>{genre.name}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div ref={scrollRef} className="reviews-section">
                  <Reviews id={id} type={type} />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Synopsis;
