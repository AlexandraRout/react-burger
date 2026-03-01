import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../types/typed-redux-hooks';

interface IProtectedRouteElementProps {
  isOnlyUnAuth?: boolean;
  element: ReactElement;
}

export default function ProtectedRouteElement({ isOnlyUnAuth = false, element }: IProtectedRouteElementProps) {
  const { user } = useAppSelector((state) => state.user);
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
