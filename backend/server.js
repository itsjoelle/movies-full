import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import favoriteRoutes from './routes/favoritesRoute.js';
import authMiddleware from './middleware/authMiddleware.js';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 5005;
const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/favorites', authMiddleware, favoriteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
