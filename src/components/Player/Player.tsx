import './Player.scss';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Player = () => {
  const navigate = useNavigate();

  return (
    <div className="container-player">
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <iframe
          // fetch trailer
          src={'https://www.youtube.com/embed/Q45wW7AmgC0/?autoplay=1&mute=1'}
        ></iframe>
      </div>
    </div>
  );
};

export default Player;
