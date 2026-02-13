import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import profilePageStyles from './profile-page.module.css';
import { logoutUser } from '../../services/user/user.thunks';

export default function ProfilePage() {
  const dispatch = useDispatch();

  const navItems = [
    { to: '/profile', label: 'Профиль', end: true },
    { to: '/profile/orders', label: 'История заказов' },
  ];

  const getLinkStyle = ({ isActive }) => `text text_type_main-medium pb-4 pt-4 ${isActive ? 'text_color_primary' : 'text_color_inactive'}`;

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={profilePageStyles.profile_page}>
      <nav className={profilePageStyles.nav_bar}>
        <div className={profilePageStyles.nav_bar}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={getLinkStyle}
            >
              {item.label}
            </NavLink>
          ))}

          <div
            role="button"
            className={`text text_type_main-medium pb-4 pt-4 text_color_inactive ${profilePageStyles.exit_button}`}
            onClick={logout}
          >
            Выход
          </div>

          <p className="mt-20 text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
      </nav>

      <Outlet />

    </div>
  );
}
