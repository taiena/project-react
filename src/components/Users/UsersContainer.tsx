import React, { Component } from "react";
import {
  follow,
  unfollow,
  requestUsers,
  FilterType,
} from "../../redux/usersReducer";
import { connect } from "react-redux";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {
  getUsers,
  getCurrentPage,
  getFollowingInProgress,
  getIsLoading,
  getPageSize,
  getTotalUsersCount,
  getUserFilter,
} from "../../redux/usersSelectors";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  isLoading: boolean;
  followingInProgress: Array<number>;
  users: Array<UserType>;
  filter: FilterType;
};

type MapDispatchPropsType = {
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  requestUsers: (
    currentPage: number,
    pageSize: number,
    filter: FilterType
  ) => void;
};

type OwnPropsType = {
  pageTitle: string;
};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends Component<PropsType> {
  componentDidMount() {
    const { currentPage, pageSize, filter } = this.props;
    this.props.requestUsers(currentPage, pageSize, filter);
  }

  onPageChanged = (pageNumber: number) => {
    const { pageSize, filter } = this.props;
    this.props.requestUsers(pageNumber, pageSize, filter);
  };

  // if the filter worked, the current page will be 1
  onFilterChanged = (filter: FilterType) => {
    const { pageSize } = this.props;
    this.props.requestUsers(1, pageSize, filter);
  };

  render() {
    return (
      <>
        {this.props.isLoading ? (
          <Preloader />
        ) : (
          <Users
            pageTitle={this.props.pageTitle}
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            users={this.props.users}
            followingInProgress={this.props.followingInProgress}
            onPageChanged={this.onPageChanged}
            onFilterChanged={this.onFilterChanged}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
          />
        )}
      </>
    );
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    filter: getUserFilter(state),
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isLoading: getIsLoading(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  OwnPropsType,
  AppStateType
>(mapStateToProps, {
  follow,
  unfollow,
  requestUsers,
})(UsersContainer);
