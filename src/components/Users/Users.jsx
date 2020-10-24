import React from "react";
import classes from "./Users.module.scss";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

let Users = ({
  currentPage,
  onPageChanged,
  totalUsersCount,
  pageSize,
  users,
  follow,
  unfollow,
  followingInProgress,
}) => {
  return (
    <div className={classes.Users}>
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalUsersCount={totalUsersCount}
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
