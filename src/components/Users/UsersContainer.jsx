import React from 'react';
import { connect } from 'react-redux';
import {
  setCurrentPage,
  toggleFollowingProgress,
  requestUsers,
  follow,
  unfollow,
  toggleIsFetching,
} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsersSuperSelector,
} from '../../redux/users-selectors';
//import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class UsersContainer extends React.Component {
  componentDidMount() {
    let { currentPage, pageSize, requestUsers } = this.props;
    requestUsers(currentPage, pageSize);
  }
  onPageChanged = (pageNumber) => {
    let { setCurrentPage, toggleIsFetching, requestUsers, pageSize } =
      this.props;
    setCurrentPage(pageNumber);
    toggleIsFetching(true);
    requestUsers(pageNumber, pageSize);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}

        <Users {...this.props} onPageChanged={this.onPageChanged} />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: getUsersSuperSelector(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    toggleIsFetching,
    setCurrentPage,
    toggleFollowingProgress,
    requestUsers,
    follow,
    unfollow,
  })
  //withAuthRedirect
)(UsersContainer);
