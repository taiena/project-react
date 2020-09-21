import React from "react";
import classes from "./Users.module.scss";
import * as axios from "axios";
import userAva from "../../assets/images/ava.png";

let Users = (props) => {
  let getUsers = () => {
    // изначально юзеров в стейте нет, если их нет, то задиспатчится setUsers
    // юзеры запишутся в стейт и компонент перерисуется с ними
    if (props.users.length === 0) {
      // после получения api приходит response, в нем сидит data, в ней массив items
      axios
        .get("https://social-network.samuraijs.com/api/1.0/users")
        .then((response) => {
          props.setUsers(response.data.items);
        });
    }
  };

  return (
    <div className={classes.Users}>
      <button onClick={getUsers}>Get users</button>
      {props.users.map((user) => (
        <div className={classes.User} key={user.id}>
          <div className={classes.UserAva}>
            <img
              src={user.photos.small != null ? user.photos.small : userAva}
            />
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
