import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import navLinkStyles from './header-nav-link.module.css';

export default function HeaderNavLink({ to, icon: IconComponent, text }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${navLinkStyles.header_nav_link} ${isActive ? 'text_color_primary' : 'text_color_inactive'}`}
    >
      {({ isActive }) => (
        <>
          <IconComponent type={isActive ? 'primary' : 'secondary'} />
          <span className={`text text_type_main-default ${isActive ? 'text_color_primary' : 'text_color_inactive'}`}>
            {text}
          </span>
        </>
      )}
    </NavLink>
  );
}

HeaderNavLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
};
