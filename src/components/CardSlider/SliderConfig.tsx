import React from 'react';

interface Props {
  className: string;
  onClick: () => void;
}

export function SampleNextArrow({ className, onClick }: Props) {
  return <div className={className} onClick={onClick}></div>;
}

export function SamplePrevArrow({ className, onClick }: Props) {
  return <div className={className} onClick={onClick}></div>;
}
