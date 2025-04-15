import { useSelector } from 'react-redux';
import './Search.scss';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../state/store';

const Search = () => {
  const searchResults = useSelector(
    (state: RootState) => state.search.searchResults
  );
  const search = useSelector((state: RootState) => state.search.searchTerm);

  const getStars = (vote_average: number) => {
    const stars = [];

    if (stars.length >= 10) return;
    for (let i = 1; i <= vote_average; i++) {
      stars.push(<FaStar key={uuidv4()} color="#FD0769" />);
    }

    const rest = 10 - vote_average;

    for (let j = 1; j <= rest; j++) {
      stars.push(<FaRegStar key={uuidv4()} color="grey" />);
    }
    return stars;
  };

  return (
    <div className="container-search">
      <div className="searchHeadline">
        {searchResults.length > 0
          ? `Search results for: ${search}`
          : 'No search results found, try something else...'}
      </div>
      <div className="results">
        {searchResults.map((item) => {
          return (
            <div key={item.id} className="card">
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                />
              </div>
              <div className="card-meta">
                <div
                  className={`${
                    item.title.length > 30 ? 'long' : ''
                  } card-title`}
                >
                  {item.title}
                </div>

                <div className="card-starsContainer">
                  <div className="card-stars">
                    {getStars(Math.round(item.vote_average))}
                  </div>
                  <div> {Math.round(item.vote_average)} / 10</div>
                </div>

                <div className="card-released">
                  Released {item.release_date}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
