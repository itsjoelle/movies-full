import React from 'react';
import './CardSlider.scss';
import Card from '../Card/Card';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SampleNextArrow, SamplePrevArrow } from './SliderConfig';

interface CardSliderProps {
  title: string;
  data: [];
  type: string;
}

type Item = {
  id: number;
  name: string;
  image: string;
  genres: [];
};

const CardSlider = ({ title, data, type }: CardSliderProps) => {
  return (
    <div className="slider-container outerContainer">
      <h1> {title}</h1>
      <Slider {...settings}>
        {data.map((item: Item, i) => {
          return <Card movieData={item} index={i} key={item.id} type={type} />;
        })}
      </Slider>
    </div>
  );
};

export default CardSlider;

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 2,
  initialSlide: 0,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,

  responsive: [
    {
      breakpoint: 380,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 550,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 820,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 4,
      },
    },

    {
      breakpoint: 1920,
      settings: {
        slidesToShow: 5,
      },
    },
  ],
};
