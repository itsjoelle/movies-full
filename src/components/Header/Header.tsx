import React from 'react';
import './Header.scss';
import { useViewport } from '../../customHooks/useViewport';
import { FaPlay } from 'react-icons/fa';

interface HeaderProps {
  login: boolean;
}

const Header: React.FC<HeaderProps> = ({ login }) => {
  const windowSize = useViewport();

  return (
    <div className="container-header flex a-center">
      <div className={`logo ${login && 'login'}`}>
        CINEMATIC
        <span>
          <FaPlay size={windowSize < 500 ? 20 : 40} />
        </span>
      </div>
    </div>
  );
};

export default Header;
