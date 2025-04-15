import React, { useEffect, useState } from 'react';
import './Favorites.scss';
import { useSelector } from 'react-redux';
import Search from '../components/Search/Search';
import OuterWrapper from '../components/OuterWrapper/OuterWrapper';
import { RootState } from '../state/store';

interface Favorite {
  category: string;
  genres: string;
  favorite_id: number;
  poster_path: string;
  title: string;
}
const Favorites = () => {
  const [favorites, setFavorites] = useState<Favorite[] | []>([]);
  const search = useSelector((state: RootState) => state.search.searchTerm);
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);

  useEffect(() => {
    if (!loggedIn) {
      return;
    }
    const fetchFavorites = async () => {
      // fetch backend
      const response = await fetch('http://localhost:5005/favorites', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      setFavorites(data);
    };
    fetchFavorites();
  }, []);

  const movies = favorites.filter((fav) => fav.category === 'movie');
  const tvShows = favorites.filter((fav) => fav.category === 'tv');

  return (
    <div className="container-favorites">
      <OuterWrapper />
      {search !== '' ? (
        <Search />
      ) : (
        <div className="data">
          <h1>Your Favorites</h1>
          <div>
            <h2>Movies</h2>
            <div className="card-container">
              {movies.map((favorite) => {
                return (
                  <div key={favorite.favorite_id} className="card">
                    <img
                      className="poster"
                      src={`https://image.tmdb.org/t/p/w500/${favorite.poster_path}`}
                      alt="poster"
                    />
                    <div>{favorite.title}</div>
                    <div>{favorite.genres.split(',').join(', ')}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h2>Series</h2>
            <div className="card-container">
              {tvShows.map((favorite) => {
                return (
                  <div key={favorite.favorite_id} className="card">
                    <img
                      className="poster"
                      src={`https://image.tmdb.org/t/p/w500/${favorite.poster_path}`}
                      alt="poster"
                    />
                    <div>{favorite.title}</div>
                    <div>{favorite.genres}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
