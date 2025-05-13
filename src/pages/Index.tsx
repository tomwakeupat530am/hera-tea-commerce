
import React from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Redirect to homepage
  return <Navigate to="/home" replace />;
};

export default Index;
