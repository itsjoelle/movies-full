import { useEffect, useState } from 'react';

export const useViewport = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const checkResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', checkResize);

    return () => {
      window.removeEventListener('resize', checkResize);
    };
  }, []);

  return windowSize;
};
