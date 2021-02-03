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
import { startChatting } from "../../redux/dialogsReducer";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUsers,
  selectCurrentPage,
  selectFollowingInProgress,
  selectPageSize,
  selectTotalUsersCount,
  selectUserFilter,
} from "../../redux/usersSelectors";
import { useHistory } from "react-router-dom";
import * as queryString from "querystring";

type PropsType = {};

type QueryParamsType = { term?: string; page?: string; friend?: string };

export const Users: React.FC<PropsType> = () => {
  const users = useSelector(selectUsers);
  const totalUsersCount = useSelector(selectTotalUsersCount);
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  const filter = useSelector(selectUserFilter);
  const followingInProgress = useSelector(selectFollowingInProgress);
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    const parsed = queryString.parse(
      history.location.search.substr(1)
    ) as QueryParamsType;

    let actualPage = currentPage;
    let actualFilter = filter;

    if (!!parsed.page) actualPage = Number(parsed.page);
    if (!!parsed.term)
      actualFilter = { ...actualFilter, term: parsed.term as string };

    switch (parsed.friend) {
      case "null":
        actualFilter = { ...actualFilter, friend: null };
        break;
      case "true":
        actualFilter = { ...actualFilter, friend: true };
        break;
      case "false":
        actualFilter = { ...actualFilter, friend: false };
        break;
    }

    dispatch(requestUsers(actualPage, pageSize, actualFilter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const query: QueryParamsType = {};

    if (!!filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend);
    if (currentPage !== 1) query.page = String(currentPage);

    history.push({
      pathname: "/users",
      search: queryString.stringify(query),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, currentPage]);

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

  const startChatWithUser = (userId: number) => {
    dispatch(startChatting(userId));
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
          startChatting={startChatWithUser}
        />
      ))}
    </div>
  );
};
