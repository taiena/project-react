import React, { Component } from "react";
import {
  follow,
  unfollow,
  setCurrentPage,
  toggleFollowingProgress,
  getUsers,
} from "../../redux/usersReducer.js";
import { connect } from "react-redux";
import Users from "./Users.jsx";
import Preloader from "../common/Preloader/Preloader";

class UsersContainer extends Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  // при клике на номер страницы новый запрос апи с pageNumber
  onPageChanged = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
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
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isLoading: state.usersPage.isLoading,
    followingInProgress: state.usersPage.followingInProgress,
  };
};

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setCurrentPage,
  toggleFollowingProgress,
  getUsers,
})(UsersContainer);
