// src/components/NotFoundRedirect.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const NotFoundRedirect = () => {
  const role = localStorage.getItem('role');

  if (role == 'MAESTRO') {
    console.warn('[NotFoundRedirect.jsx] Redirigiendo a /login-docente para rutas no encontradas.');
    return <Navigate to="/login-docente" replace />;
  } else if (role == 'ESTUDIANTE') {
    console.warn('[NotFoundRedirect.jsx] Redirigiendo a /login-estudiante para rutas no encontradas.');
    return <Navigate to="/login-estudiante" replace />;
  } else {
    console.warn('[NotFoundRedirect.jsx] Rol desconocido. Redirigiendo a /login-docente.');
    return <Navigate to="/login-docente" replace />;
  }
};

export default NotFoundRedirect;
