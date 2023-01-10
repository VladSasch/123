import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

const Header = (props) => {
  return (
    <header className={s.header}>
      <img
        src="https://play-lh.googleusercontent.com/DTzWtkxfnKwFO3ruybY1SKjJQnLYeuK3KmQmwV5OQ3dULr5iXxeEtzBLceultrKTIUTr"
        alt=""
      />
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <div className={s.login}>
            {props.login} - <button onClick={props.logout}>Log out</button>
            <div className={s.idBlock}>userId:{props.id}</div>
          </div>
        ) : (
          <NavLink to={'/login'}>
            <div className={s.Login}>Login</div>
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
