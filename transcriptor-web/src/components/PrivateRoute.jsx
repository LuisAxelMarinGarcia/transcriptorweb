// src/components/PrivateRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
        const redirectPath = allowedRoles.includes('MAESTRO') ? '/login-docente' : '/login-estudiante';
        console.warn(`[PrivateRoute.jsx] No se encontró token en localStorage. Redirigiendo a ${redirectPath}.`);
        return <Navigate to={redirectPath} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        const redirectPath = role === 'MAESTRO' ? '/login-docente' : '/login-estudiante';
        console.warn(`[PrivateRoute.jsx] Rol "${role}" no autorizado para acceder a esta ruta. Redirigiendo a ${redirectPath}.`);
        return <Navigate to={redirectPath} replace />;
    }

    console.log('[PrivateRoute.jsx] Autenticación y autorización exitosa. Accediendo a la ruta protegida.');
    return children;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PrivateRoute;
