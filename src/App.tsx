import './App.scss';
import { RouterProvider } from 'react-router-dom';
import { routerInstance } from './components/Router/Router';
import { useEffect } from 'react';
import { checkAuth } from './state/auth/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './state/store';

const router = routerInstance;

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
