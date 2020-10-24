import React from "react";
import classes from "./Users.module.scss";
import userAva from "../../assets/images/ava.png";
import { NavLink } from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";

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

      {/* вывод массива users */}
      {users.map((user) => (
        <div className={classes.User} key={user.id}>
          <div className={classes.UserAva}>
            <NavLink to={"/profile/" + user.id}>
              <img
                src={user.photos.small != null ? user.photos.small : userAva}
                alt=""
              />
            </NavLink>
          </div>
          <div className={classes.UserBtn}>
            {user.followed ? (
              <button
                // если в массиве хоть одна айди = айди пользователя, тогда button disabled
                disabled={followingInProgress.some((id) => id === user.id)}
                onClick={() => {
                  unfollow(user.id);
                }}
              >
                Unfollow
              </button>
            ) : (
              <button
                // если в массиве хоть одна айди = айди пользователя, тогда button disabled
                disabled={followingInProgress.some((id) => id === user.id)}
                onClick={() => {
                  follow(user.id);
                }}
              >
                Follow
              </button>
            )}
          </div>
          <div className={classes.UserInfo}>
            <div className={classes.UserPerson}>
              <div>{user.name}</div>
              <div>{user.status}</div>
            </div>
            <div className={classes.UserLocation}>
              <div>{"user.location.country"}</div>
              <div>{"user.location.city"}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
