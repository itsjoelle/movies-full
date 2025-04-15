import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../pool.js';

const router = express.Router();

const JWTTOKEN = process.env.JWT_TOKEN;

router.post('/signup', async (req, res) => {
  if (!pool) {
    console.error('Database pool is not initialized!');
    return;
  }

  const { name, email, password } = req.body;

  // encrypt password
  const hashedPassword = bcrypt.hashSync(password, 8);
  try {
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );

    const token = jwt.sign(
      {
        id: newUser.rows[0].id,
      },
      JWTTOKEN,
      {
        expiresIn: '24h',
      }
    );
    console.log('user signed up successfully');
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24,
      })
      .status(201)
      .json({ message: 'User signed up successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error occured' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (userCheck.rows.length <= 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = bcrypt.compareSync(
      password,
      userCheck.rows[0].password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      {
        id: userCheck.rows[0].id,
      },
      JWTTOKEN,
      {
        expiresIn: '24h',
      }
    );
    console.log('user signed up successfully');
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24,
      })
      .status(201)
      .json({ message: 'User signed up successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error occured' });
  }
});

router.get('/signup', (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

router.get('/status', (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ isAuthenticated: false });

  try {
    const decoded = jwt.verify(token, JWTTOKEN);
    return res.status(200).json({ isAuthenticated: true, id: decoded.id });
  } catch (error) {
    return res.status(401).json({ isAuthenticated: false });
  }
});

export default router;
