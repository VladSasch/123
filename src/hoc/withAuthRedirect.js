//import React, { Component } from "react";
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

// export const withAuthRedirect = (Component) => {
//   class RedirectComponent extends React.Component {
//     render() {
//       if (!this.props.isAuth) return <Navigate to="/login" />;
//       return <Component {...this.props} />;
//     }
//   }
//   return RedirectComponent;
// };

let mapStateToPropsForRedirect = (state) => ({
  isAuth: state.auth.isAuth,
});

export const withAuthRedirect = (Component) => {
  const RedirectComponent = (props) => {
    if (!props.isAuth) return <Navigate to="/login" />;
    return <Component {...props} />;
  };

  let ConnectAuthRedirectComponent = connect(mapStateToPropsForRedirect)(
    RedirectComponent
  );
  return ConnectAuthRedirectComponent;
};
