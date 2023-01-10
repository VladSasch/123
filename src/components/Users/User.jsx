import React from 'react';
import styles from './Users.module.css';
import userPhoto from '../../assets/images/img.png';
import { NavLink } from 'react-router-dom';

const User = ({ user, followingInProgress, follow, unfollow }) => {
  return (
    <div>
      <span>
        <div>
          <NavLink to={'/profile/' + user.id}>
            <img
              src={user.photos.small != null ? user.photos.small : userPhoto}
              alt=""
              className={styles.userPhoto}
            />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <button
              disabled={followingInProgress.some((el) => el === user.id)}
              onClick={() => {
                follow(user.id);
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              disabled={followingInProgress.some((el) => el === user.id)}
              onClick={() => {
                unfollow(user.id);
              }}
            >
              Follow
            </button>
          )}
        </div>
      </span>
      <span>
        <span>
          <div>userId:{user.id}</div>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
        <span>
          <div>{'user.location.country'}</div>
          <div>{'user.location.city'}</div>
        </span>
      </span>
    </div>
  );
};
export default User;
