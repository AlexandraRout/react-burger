import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import navLinkStyles from './nav-link.module.css';

function NavLink({
  to, icon, text, className,
}) {
  const combinedClassName = className
    ? `${navLinkStyles.nav_link} ${className}`
    : navLinkStyles.nav_link;

  return (
    <Link to={to} className={combinedClassName}>
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
  className: PropTypes.string,
};

NavLink.defaultProps = {
  className: '',
};

export default NavLink;
