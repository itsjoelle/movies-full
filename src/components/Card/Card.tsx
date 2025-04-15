import React, { useEffect, useState } from 'react';
import './Card.scss';
import { useNavigate } from 'react-router-dom';
import { RiThumbDownFill, RiThumbUpFill } from 'react-icons/ri';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import axios from 'axios';
import { MOVIE_URL } from '../../constants';
import classnames from 'classnames';
import { useViewport } from '../../customHooks/useViewport';
import { calcCardWith } from '../../utils/calculateCardWidth';
import { data } from '../../data/dataFields';

interface MovieData {
  id: number;
  name: string;
  genres: [];
}
interface CardProps {
  movieData: MovieData;
  index: number;
  type: string;
}

const Card = ({ movieData, type }: CardProps) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const [infoText, setInfoText] = useState('default');
  const [trailerVid, setTrailerVid] = useState<string | null>(null);
  const windowSize = useViewport();

  useEffect(() => {
    const fetchTrailer = async () => {
      if (!hover) return;
      try {
        const response = await axios.get(
          `${MOVIE_URL}/${type}/${movieData.id}/videos?api_key=${
            import.meta.env.VITE_API_KEY
          }`
        );
        const trailerKey = response.data.results[0]?.key;
        if (trailerKey) {
          const trailerVideo = `https://www.youtube.com/embed/${trailerKey}/?autoplay=1&mute=1`;
          setTrailerVid(trailerVideo);
        }

        if (!trailerVid) console.error('No trailer found');
      } catch (error) {
        console.error('Error fetching trailer:', error);
      }
    };

    fetchTrailer();
  }, [hover]);

  const resetHover = () => {
    setInfoText('default');
    setHover(false);
  };

  const goToSynopsis = () => {
    if (type === 'all') {
      navigate(`/synopsis/movie/${movieData.id}`);
    } else {
      navigate(`/synopsis/${type}/${movieData.id}`);
    }
  };

  return (
    <div
      className="outerContainer-card"
      style={{ width: calcCardWith(windowSize) }}
    >
      <div
        className="container-card"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={resetHover}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
          alt="image"
        />

        {hover && (
          <div className="hover">
            <div className="image-video-container">
              <img
                src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
                alt="image"
                onClick={() => navigate('/player')}
              />

              {trailerVid && (
                <iframe
                  width="420"
                  height="315"
                  src={trailerVid}
                  allow="autoplay"
                ></iframe>
              )}
            </div>

            <div
              className={classnames('info-container flex column', {
                expanding: infoText === 'expanded',
                contracting: infoText === 'collapsed',
              })}
            >
              <div className="icons">
                <div className="controls flex column">
                  <div className="flex j-between">
                    <div className="thumbs">
                      <RiThumbUpFill title="Like" size={26} />
                      <RiThumbDownFill title="Dislike" size={26} />
                    </div>
                    <div className="info">
                      <div>
                        {infoText === 'default' || infoText === 'collapsed' ? (
                          <BiChevronDown
                            title="More Info"
                            onClick={() => setInfoText('expanded')}
                          />
                        ) : (
                          <BiChevronUp
                            title="More Info"
                            onClick={() => setInfoText('collapsed')}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="infotext">{data.summary}</div>
            </div>
          </div>
        )}
      </div>
      <div onClick={goToSynopsis} className="filmtitle">
        {movieData.name}
      </div>
    </div>
  );
};
export default Card;
