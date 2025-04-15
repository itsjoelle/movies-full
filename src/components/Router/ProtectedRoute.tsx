import React from 'react';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../state/store';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);

  if (!loggedIn) return <Navigate to="/signup" />;

  return children;
};

export default ProtectedRoute;
