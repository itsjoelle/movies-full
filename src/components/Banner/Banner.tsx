import React, { useState } from 'react';
import './Banner.scss';
import { FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useViewport } from '../../customHooks/useViewport';
import { bannerData } from '../../data/bannerData';
import classnames from 'classnames';
import { MdArrowBackIos } from 'react-icons/md';
import { MdArrowForwardIos } from 'react-icons/md';

const Banner = () => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const navigate = useNavigate();
  const windowSize = useViewport();
  const [data, setData] = useState(bannerData);

  const [animationKey, setAnimationKey] = useState(0);

  const handleNext = () => {
    const cycledData = [...data.slice(1), data[0]];
    setAnimationKey((prevKey) => prevKey + 1);
    setData(cycledData);
  };

  const handlePrev = () => {
    const cycledData = [data[data.length - 1], ...data.slice(0, -1)];
    setAnimationKey((prevKey) => prevKey + 1);
    setData(cycledData);
  };

  return (
    <>
      <div className="container-banner">
        <div className={classnames('carousel', {})}>
          <div className="list">
            {data.map((item, index) => {
              return (
                <div
                  key={index === 0 ? `${index}-${animationKey}` : index}
                  className={index === 0 ? 'item animate' : 'item'}
                >
                  <img
                    src={windowSize < 1025 ? item.imagePortrait : item.image}
                    alt="banner"
                  />
                  <div className="info">
                    <div className="content">
                      <h1 className="title">{item.title}</h1>
                      <p className="description">
                        {item.description[0]}{' '}
                        {!showMoreInfo && windowSize <= 800 && (
                          <span
                            className="showmore"
                            onClick={() => setShowMoreInfo((prev) => !prev)}
                          >
                            Show more..
                          </span>
                        )}{' '}
                        {(showMoreInfo || windowSize > 800) && (
                          <span>{item.description[1]}</span>
                        )}
                      </p>{' '}
                    </div>
                    <div className="buttons">
                      <button
                        onClick={() => navigate('/player')}
                        className="flex j-center a-center"
                      >
                        <FaPlay /> TRAILER
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="thumbnail">
            {data.map((item, index) => {
              return (
                <div
                  key={index === 2 ? `${index}-${animationKey}` : index}
                  className={index === 2 ? 'item animate' : 'item'}
                >
                  <img src={item.image} alt="banner" />
                  <div className="content"></div>
                </div>
              );
            })}
          </div>
          <div className="buttonSwipe">
            <button onClick={handlePrev}>
              <MdArrowBackIos />
            </button>
            <button onClick={handleNext}>
              <MdArrowForwardIos />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
