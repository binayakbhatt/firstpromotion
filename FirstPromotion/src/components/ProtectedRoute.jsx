import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute Component
 * Wraps protected routes (like Dashboard) to ensure only authenticated users can access them.
 * * @param {Object} props
 * @param {React.ReactNode} props.children - The protected component to render
 */
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login page, but save the current location they were trying to go to
    // This allows you to redirect them back after they login (optional future enhancement)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
