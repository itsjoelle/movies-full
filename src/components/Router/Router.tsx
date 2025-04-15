import { Navigate, createBrowserRouter } from 'react-router-dom';
import Signup from '../../pages/Signup';
import Home from '../../pages/Home';
import Player from '../Player/Player';
import Movies from '../../pages/Movies';
import TV from '../../pages/TV';
import Synopsis from '../../pages/Synopsis';
import Favorites from '../../pages/Favorites';
import ProtectedRoute from './ProtectedRoute';

export const routerInstance = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Navigate to="/home" replace />
      </ProtectedRoute>
    ),
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/signup',
    // element: tokenExist ? <Navigate to="/home" /> : <Signup />,
    element: <Signup />,
  },
  {
    path: '/player',
    element: (
      <ProtectedRoute>
        <Player />
      </ProtectedRoute>
    ),
  },
  {
    path: '/movies',
    element: (
      <ProtectedRoute>
        <Movies />
      </ProtectedRoute>
    ),
  },

  {
    path: '/tv',
    element: (
      <ProtectedRoute>
        <TV />
      </ProtectedRoute>
    ),
  },
  {
    path: '/synopsis/:id/:id',
    element: (
      <ProtectedRoute>
        <Synopsis />
      </ProtectedRoute>
    ),
  },

  {
    path: '/favorites',
    element: (
      <ProtectedRoute>
        <Favorites />
      </ProtectedRoute>
    ),
  },
]);
