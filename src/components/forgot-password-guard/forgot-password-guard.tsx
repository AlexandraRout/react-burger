import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../types/typed-redux-hooks';

interface IForgotPasswordGuardProps {
  element: ReactElement;
}

export default function ForgotPasswordGuard({ element }: IForgotPasswordGuardProps) {
  const forgotPasswordStep = useAppSelector((state) => state.user.forgotPasswordStep);

  if (forgotPasswordStep) {
    return element;
  }
  return <Navigate to="/login" replace />;
}
