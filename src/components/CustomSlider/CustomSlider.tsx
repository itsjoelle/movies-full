/* eslint-disable react-refresh/only-export-components */
import React, { useMemo } from 'react';
import './CustomSlider.scss';
import CardSlider from '../CardSlider/CardSlider';
import { sliders, titles } from '../../data/sliderData';

type Page = keyof typeof titles;

interface Item {
  genres: [];
  id: number;
  image: string;
  name: string;
}

interface SliderProps {
  data: Item[][];
  page: Page;
}

const CustomSlider: React.FC<SliderProps> = ({ data, page }) => {
  const type = useMemo(() => {
    return page === 'home' || page === 'movie' ? 'movie' : 'tv';
  }, [page]);

  return (
    <>
      <div className="slidercustom-container">
        {sliders.map((slider) => {
          return (
            <CardSlider
              key={slider.id}
              title={titles[page][slider.id]}
              data={
                slider.id === 2 ? data[slider.id].slice(4) : data[slider.id]
              }
              type={type}
            />
          );
        })}
      </div>
    </>
  );
};

export default CustomSlider;
