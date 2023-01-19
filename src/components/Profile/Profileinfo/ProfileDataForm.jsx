import React from 'react';
import { reduxForm } from 'redux-form';
import {
  createFeild,
  Input,
  Textarea,
} from '../../common/Formscon/FormsControls';
import s from './Profileinfo.module.css';
import styles from './../../common/Formscon/FormsControls.module.css';

export const ProfileDataForm = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button>save</button>
      </div>
      {error && <div className={styles.formSummaryError}>{error}</div>}

      <div>
        <b>Full Name</b>:{createFeild('Full name', 'fullName', Input, [])}
      </div>

      <div>
        <b>Looking for a job</b>:
        {createFeild('', 'lookingForAJob', Input, [], { type: 'checkbox' })}
      </div>

      <div>
        <b>My professional skills</b>:
        {createFeild(
          'My professional skills',
          'lookingForAJobDescription',
          Textarea,
          []
        )}
      </div>

      <div>
        <b>About Me</b>:{createFeild('aboutMe', 'aboutMe', Textarea, [])}
      </div>
      <div>
        <b>Contacts</b>:
        {Object.keys(profile.contacts).map((key) => {
          return (
            <div key={key} className={s.contact}>
              <b>{key}:</b>
              {createFeild(key, 'contacts.' + key, Input, [])}
            </div>
          );
        })}
      </div>
    </form>
  );
};
const ProfileDataFormReduxForm = reduxForm({
  form: 'edit-profile',
  enableReinitialize: true,
  destroyOnUnmount: false,
})(ProfileDataForm);

export default ProfileDataFormReduxForm;
