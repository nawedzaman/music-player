import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthWrapper = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default AuthWrapper;
