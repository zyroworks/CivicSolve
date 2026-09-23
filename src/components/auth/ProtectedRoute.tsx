import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
  redirectMessage?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectMessage = 'Please log in to report a community problem.' 
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // If session is still being checked/restored from storage and user is not yet loaded,
  // display a brief subtle spinner to prevent premature redirects on page refresh
  if (isLoading && !user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-500 font-medium">Verifying authentication session...</p>
      </div>
    );
  }

  // If user is not authenticated, redirect to /login and preserve intended destination
  if (!isAuthenticated || !user) {
    const destination = location.pathname + location.search;
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(destination)}`}
        state={{
          from: destination,
          message: redirectMessage,
        }}
        replace
      />
    );
  }

  return children;
};
