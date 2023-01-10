import React from 'react';
import { connect, Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';

//import DialogsContainer from "./components/Dialogs/DialogsContainer";

import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar.jsx';
import News from './components/News/News';
import {
  //ProfileContainer,
  withRouter,
} from './components/Profile/ProfileContainer';

import Setting from './components/Setting/Setting';
import UsersContainer from './components/Users/UsersContainer';

import { initializeApp } from './redux/app-reducer';

import Preloader from './components/common/Preloader/Preloader';
import store from './redux/redux-store';
import { withSuspense } from './hoc/withSuspense';

const DialogsContainer = React.lazy(() =>
  import('./components/Dialogs/DialogsContainer')
);

const ProfileContainer = React.lazy(() =>
  import('./components/Profile/ProfileContainer')
);

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          {/* <React.Suspense fallback={<div>Loading...</div>}> */}
          <Routes>
            <Route path="/dialogs/*" element={withSuspense(DialogsContainer)} />
            <Route path="/profile" element={withSuspense(ProfileContainer)}>
              <Route path=":userId" element={<ProfileContainer />} />
            </Route>
            <Route path="/users" element={<UsersContainer />} />
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          {/* </React.Suspense> */}
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

const SamuraiJSApp = (props) => {
  return (
    <React.StrictMode>
      <HashRouter>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </HashRouter>
    </React.StrictMode>
  );
};
export default SamuraiJSApp;
