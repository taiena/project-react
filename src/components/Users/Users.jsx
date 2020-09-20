import React from "react";
import classes from "./Users.module.scss";

const Users = (props) => {
  return (
    <div className={classes.Users}>
      {props.users.map((user) => (
        <div className={classes.User} key={user.id}>
          <div className={classes.UserAva}>
            <img src={user.avaUrl} />
          </div>
          <div className={classes.UserBtn}>
            {user.followed ? (
              <button
                onClick={() => {
                  props.unfollow(user.id);
                }}
              >
                Unollow
              </button>
            ) : (
              <button
                onClick={() => {
                  props.follow(user.id);
                }}
              >
                Follow
              </button>
            )}
          </div>
          <div className={classes.UserInfo}>
            <div className={classes.UserPerson}>
              <div>{user.fullName}</div>
              <div>{user.status}</div>
            </div>
            <div className={classes.UserLocation}>
              <div>{user.location.country}</div>
              <div>{user.location.city}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
