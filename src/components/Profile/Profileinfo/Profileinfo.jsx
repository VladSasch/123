import React from 'react';

import Preloader from '../../common/Preloader/Preloader';
import s from './Profileinfo.module.css';
import userPhoto from '../../../assets/images/img.png';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileDataFormReduxForm from './ProfileDataForm';

const Profileinfo = ({
  profile,
  profileStatus,
  status,
  updateStatus,
  isOwner,
  savePhoto,
  saveProfile,
  setProfileStatus,
}) => {
  // let [editMode, setEditMode] = useState(false); //реализация локального стэйта через хуки

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };
  const onSubmit = (formData) => {
    //console.log(formData);
    // saveProfile(formData).then(() => setEditMode(false));// через промисы (async.. await  здесь не работает) и хуки
    saveProfile(formData);
  };

  if (!profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div className={s.descriptionBlock}>
        <img
          src={profile.photos.large || userPhoto}
          className={s.mainPhoto}
          alt=""
        />
        {isOwner && <input type="file" onChange={onMainPhotoSelected} />}
        {
          //editMode?  //через хуки(локальный стэйт)
          profileStatus ? ( //через глобальный стэйт
            <ProfileDataFormReduxForm
              initialValues={profile}
              profile={profile}
              onSubmit={onSubmit}
            />
          ) : (
            <ProfileData
              profile={profile}
              isOwner={isOwner}
              goToEditMode={() => {
                //setEditMode(true); //через хуки
                setProfileStatus(true);
              }}
            />
          )
        }
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
};

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return (
    <div>
      {isOwner && (
        <div>
          <button onClick={goToEditMode}>edit</button>
        </div>
      )}
      <div>
        <b>Full Name</b>:{profile.fullName}{' '}
      </div>
      <div>
        <b>User ID:</b>
        {profile.userId}
      </div>
      <div>
        <b>Looking for a job</b>:{profile.lookingForAJob ? 'Yes' : 'No'}{' '}
      </div>

      {profile.lookingForAJob && (
        <div>
          <b>My professional skills</b>:{profile.lookingForAJobDescription}{' '}
        </div>
      )}
      <div>
        <b>About Me</b>:{profile.aboutMe}{' '}
      </div>
      <div>
        <b>Contacts</b>:
        {Object.keys(profile.contacts).map((key) => (
          <Contact
            contactTitle={key}
            contactValue={profile.contacts[key]}
            key={key}
          />
        ))}{' '}
      </div>
    </div>
  );
};

const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div className={s.contact}>
      <b>{contactTitle}</b>:{contactValue}
    </div>
  );
};

export default Profileinfo;
