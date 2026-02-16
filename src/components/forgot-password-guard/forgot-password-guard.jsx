import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ForgotPasswordGuard({ element }) {
  const forgotPasswordStep = useSelector((state) => state.user.forgotPasswordStep);

  if (forgotPasswordStep) {
    return element;
  }
  return <Navigate to="/login" replace />;
}

ForgotPasswordGuard.propTypes = {
  element: PropTypes.element.isRequired,
};
