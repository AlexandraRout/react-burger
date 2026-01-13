import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import navLinkStyles from './nav-link.module.css';

export default function NavLink({ to, icon, text }) {
  return (
    <Link to={to} className={navLinkStyles.nav_link}>
      {icon}
      <span className="text text_type_main-default text_color_inactive">
        {text}
      </span>
    </Link>
  );
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
};
