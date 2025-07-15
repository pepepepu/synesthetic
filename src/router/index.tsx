import { createBrowserRouter, Navigate } from 'react-router-dom';
import type { JSX } from 'react';
import { Login, Dashboard, Visualization } from '../screens';
import AuthCallback from '../screens/AuthCallback';

// Componente PrivateRoute (sem alterações)
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem('spotify_access_token');
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: '/visualization/:trackId',
    element: (
      <PrivateRoute>
        <Visualization />
      </PrivateRoute>
    ),
  },
  // 2. ATUALIZE A ROTA DE CALLBACK AQUI
  {
    path: '/callback',
    element: <AuthCallback />, // Use o componente AuthCallback para processar o login
  },
]);