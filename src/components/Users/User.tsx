import React from "react";
import classes from "./User.module.scss";
import userAva from "../../assets/images/ava.svg";
import { NavLink } from "react-router-dom";
import { UserType } from "../../types/types";
import { Button, ButtonTypes } from "../common/Button/Button";

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
      <div className={classes.Photo}>
        <NavLink to={"/profile/" + user.id}>
          <img
            src={user.photos.small != null ? user.photos.small : userAva}
            alt=""
          />
        </NavLink>
      </div>

      <div className={classes.Info}>
        <div className={classes.Name}>{user.name}</div>
        <div className={classes.Status}>{user.status}</div>
      </div>

      <div className={classes.Buttons}>
        <div>
          {user.followed ? (
            <Button
              onClick={() => {
                unfollow(user.id);
              }}
              type={ButtonTypes.InterfaceType2}
              disabled={followingInProgress.some((id) => id === user.id)}
              text="unfollow"
            />
          ) : (
            <Button
              onClick={() => {
                follow(user.id);
              }}
              type={ButtonTypes.InterfaceType2}
              disabled={followingInProgress.some((id) => id === user.id)}
              text="follow"
            />
          )}
        </div>
        <div>
          <Button
            onClick={() => {
              startChatting(user.id);
            }}
            type={ButtonTypes.InterfaceType2}
            disabled={followingInProgress.some((id) => id === user.id)}
            text="Start chatting"
          />
        </div>
      </div>
    </section>
  );
};

export default User;
