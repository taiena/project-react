import React from "react";
import classes from "./User.module.scss";
import userAva from "../../assets/images/ava.svg";
import { NavLink } from "react-router-dom";
import { UserType } from "../../types/types";

type PropsType = {
  user: UserType;
  followingInProgress: Array<number>;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  startChatting: (userId: number) => void;
};

let User: React.FC<PropsType> = ({
  follow,
  unfollow,
  startChatting,
  followingInProgress,
  user,
}) => {
  return (
    <section className={classes.User}>
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
        <button
          onClick={() => {
            startChatting(user.id);
          }}
        >
          Start chatting
        </button>
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
    </section>
  );
};

export default User;
