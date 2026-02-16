import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export default function ProtectedRouteElement({ isOnlyUnAuth = false, element }) {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  if (isOnlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} replace />;
  }

  if (!isOnlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
}

ProtectedRouteElement.propTypes = {
  isOnlyUnAuth: PropTypes.bool,
  element: PropTypes.element.isRequired,
};
