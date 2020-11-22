import React from "react";
import classes from "./Users.module.scss";
import Paginator from "../common/Paginator/Paginator";
import UsersSearchForm from "./UsersSearchForm/UsersSearchForm";
import User from "./User";
import { UserType } from "../../types/types";
import { FilterType } from "../../redux/usersReducer";

type PropsType = {
  pageTitle: string;
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  users: Array<UserType>;
  followingInProgress: Array<number>;
  onPageChanged: (pageNumber: number) => void;
  onFilterChanged: (filter: FilterType) => void;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};

let Users: React.FC<PropsType> = ({
  pageTitle,
  totalUsersCount,
  pageSize,
  currentPage,
  users,
  followingInProgress,
  onPageChanged,
  onFilterChanged,
  follow,
  unfollow,
}) => {
  return (
    <div className={classes.Users}>
      {pageTitle}
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
          follow={follow}
          unfollow={unfollow}
          followingInProgress={followingInProgress}
        />
      ))}
    </div>
  );
};

export default Users;
