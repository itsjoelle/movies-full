import express from 'express';
import { pool } from '../pool.js';

const router = express.Router();

router.get('/', async (req, res) => {
  if (!pool) {
    console.error('Database pool is not initialized!');
    return;
  }

  try {
    const favorites = await pool.query(
      `SELECT f.id AS favorite_id, f.category, m.poster_path, m.title, m.genres
      FROM favorites f
      JOIN movies m
        ON f.movie_id = m.id AND f.category = m.category
      WHERE f.user_id = $1;`,
      [req.userId]
    );

    res.status(200).json(favorites.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  if (!pool) {
    console.error('Database pool is not initialized!');
    return;
  }

  const body = req.body;

  const { id, poster_path: poster, genres, category } = body;

  const title = category === 'tv' ? body.name : body.original_title;

  const genreNames = genres.map((genre) => genre.name).join(',');

  try {
    let movieId;

    const movieCheck = await pool.query(
      'SELECT * FROM movies WHERE id = $1 AND category = $2',
      [id, category]
    );
    if (movieCheck.rows.length <= 0) {
      const newMovie = await pool.query(
        'INSERT INTO movies (id, title, poster_path, genres, category) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [id, title, poster, genreNames, category]
      );
      movieId = newMovie.rows[0].id;
    } else {
      movieId = movieCheck.rows[0].id;
    }

    const newFavorite = await pool.query(
      'INSERT INTO favorites (user_id, movie_id, category) VALUES ($1, $2, $3) RETURNING *',
      [req.userId, movieId, category]
    );

    res.status(201).json(newFavorite.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
