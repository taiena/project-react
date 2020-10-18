import React, { Component } from "react";
import {
  follow,
  unfollow,
  toggleFollowingProgress,
  requestUsers,
} from "../../redux/usersReducer.js";
import { connect } from "react-redux";
import Users from "./Users.jsx";
import Preloader from "../common/Preloader/Preloader";
import {
  getUsers,
  getCurrentPage,
  getFollowingInProgress,
  getIsLoading,
  getPageSize,
  getTotalUsersCount,
} from "../../redux/usersSelectors";

class UsersContainer extends Component {
  componentDidMount() {
    this.props.requestUsers(this.props.currentPage, this.props.pageSize);
  }

  // при клике на номер страницы новый запрос апи с pageNumber
  onPageChanged = (pageNumber) => {
    this.props.requestUsers(pageNumber, this.props.pageSize);
  };

  render() {
    return (
      <>
        {this.props.isLoading ? (
          <Preloader />
        ) : (
          <Users
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            users={this.props.users}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            followingInProgress={this.props.followingInProgress}
          />
        )}
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isLoading: getIsLoading(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default connect(mapStateToProps, {
  follow,
  unfollow,
  toggleFollowingProgress,
  requestUsers,
})(UsersContainer);
