/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated, children }) {
  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;