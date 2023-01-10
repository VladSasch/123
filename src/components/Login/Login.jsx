import React from 'react';
import { reduxForm } from 'redux-form';
import {
  maxLengthCreator,
  requiredFeild,
} from '../../utils/validators/validators';
import { createFeild, Input } from '../common/Formscon/FormsControls';
import { login } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import s from './../common/Formscon/FormsControls.module.css';

const LoginForm = ({ handleSubmit, error }) => {
  const maxLength30 = maxLengthCreator(30);
  return (
    <form onSubmit={handleSubmit}>
      {createFeild('Email', 'email', Input, [requiredFeild, maxLength30])}
      {createFeild(
        'Password',
        'password',
        Input,
        [requiredFeild, maxLength30],
        { type: 'password' }
      )}
      {createFeild(
        null,
        'rememberMe',
        Input,
        [],
        {
          type: 'checkbox',
        },
        'remember me'
      )}

      {error && <div className={s.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  form: 'login',
})(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe);
  };

  if (props.isAuth) return <Navigate to="/profile" />;

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};
let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
