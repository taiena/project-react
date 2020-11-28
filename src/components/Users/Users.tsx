import React, { useEffect } from "react";
import classes from "./Users.module.scss";
import Paginator from "../common/Paginator/Paginator";
import UsersSearchForm from "./UsersSearchForm/UsersSearchForm";
import User from "./User";
import {
  FilterType,
  requestUsers,
  follow,
  unfollow,
} from "../../redux/usersReducer";
import { useSelector, useDispatch } from "react-redux";
import {
  getUsers,
  getCurrentPage,
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUserFilter,
} from "../../redux/usersSelectors";

type PropsType = {};

export const Users: React.FC<PropsType> = () => {
  const users = useSelector(getUsers);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUserFilter);
  const followingInProgress = useSelector(getFollowingInProgress);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize, filter));
  }, []);

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter));
  };

  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter));
  };

  const followUser = (userId: number) => {
    dispatch(follow(userId));
  };
  const unfollowUser = (userId: number) => {
    dispatch(unfollow(userId));
  };

  return (
    <div className={classes.Users}>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
      />

      {users.map((user) => (
        <User
          key={user.id}
          user={user}
          follow={followUser}
          unfollow={unfollowUser}
          followingInProgress={followingInProgress}
        />
      ))}
    </div>
  );
};
