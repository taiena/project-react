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
import { useHistory } from "react-router-dom";
import * as queryString from "query-string";

type PropsType = {};

export const Users: React.FC<PropsType> = () => {
  const users = useSelector(getUsers);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUserFilter);
  const followingInProgress = useSelector(getFollowingInProgress);
  const history = useHistory();

  const dispatch = useDispatch();

  const parsed: {
    term?: string;
    friend?: "true" | "false" | "null";
    page?: string;
  } = queryString.parse(history.location.search);

  const actualFilter = { ...filter };

  let actualPage = currentPage;

  if (parsed.term) {
    actualFilter.term = parsed.term;
  }
  if (parsed.friend) {
    actualFilter.friend =
      parsed.friend === "true"
        ? true
        : parsed.friend === "false"
        ? false
        : null;
  }
  if (parsed.page && parsed.page !== "1") {
    actualPage = +parsed.page;
  }

  useEffect(() => {
    dispatch(requestUsers(actualPage, pageSize, actualFilter));
  }, []);

  const onPageChanged = (pageNumber: number) => {
    history.push({
      pathname: "/users",
      search: `?term=${filter.term}&friend=${filter.friend}&page=${pageNumber}`,
    });
    dispatch(requestUsers(pageNumber, pageSize, filter));
  };

  const onFilterChanged = (filter: FilterType) => {
    history.push({
      pathname: "/users",
      search: `?term=${filter.term}&friend=${filter.friend}&page=${actualPage}`,
    });
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
      <UsersSearchForm
        onFilterChanged={onFilterChanged}
        initialValue={actualFilter}
      />
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
