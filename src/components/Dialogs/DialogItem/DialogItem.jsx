import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './../Dialogs.module.css';

const DialogItem = (props) => {
  return (
    <div className={`${s.dialog} ${s.active}`}>
      <NavLink to={'/dialogs/' + props.id}>
        <div className="avatar">
          <img
            src="https://cspromogame.ru//storage/upload_images/avatars/769.jpg"
            alt=""
          />
          {props.name}
        </div>
      </NavLink>
    </div>
  );
};

export default DialogItem;
