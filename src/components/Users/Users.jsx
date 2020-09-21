import React from "react";
import classes from "./Users.module.scss";

const Users = (props) => {
  // изначально юзеров в стейте нет, если их нет, то задиспатчится setUsers
  // юзеры запишутся в стейт и компонент перерисуется с ними
  if (props.users.length === 0) {
    props.setUsers([
      {
        id: 1,
        followed: false,
        avaUrl: "https://avatars.mitosa.net/cat/up-006.jpg",
        fullName: "Vasiliy",
        status: "I am super pro",
        location: { city: "Murmansk", country: "Russia" },
      },
      {
        id: 2,
        followed: true,
        avaUrl: "https://avatars.mitosa.net/cat/up-006.jpg",
        fullName: "Fekla",
        status: "I am hard to find and easy to lose",
        location: { city: "Olenegorsk", country: "Russia" },
      },
    ]);
  }

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
