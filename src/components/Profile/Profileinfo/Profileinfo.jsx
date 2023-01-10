import React from 'react';

import Preloader from '../../common/Preloader/Preloader';
import s from './Profileinfo.module.css';

import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const Profileinfo = ({ profile, status, updateStatus }) => {
  if (!profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div className={s.descriptionBlock}>
        <img src={profile.photos.large} alt="" />
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>

      <div> {profile.aboutMe} </div>
      <div> {profile.fullName} </div>
      <div> {profile.contacts.instagram} </div>
    </div>
  );
};

export default Profileinfo;
