import React from 'react';
import { NavLink } from 'react-router-dom';
import navLinkStyles from './header-nav-link.module.css';

interface IHeaderNavLinkProps {
  to: string;
  icon: React.ComponentType<any>;
  text: string;
}

export default function HeaderNavLink({ to, icon: IconComponent, text }: IHeaderNavLinkProps) {
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
