import React, { Component } from "react";
import classes from "./Users.module.scss";
import * as axios from "axios";
import userAva from "../../assets/images/ava.png";

export default class Users extends Component {
  componentDidMount() {
    // изначально юзеров в стейте нет, если их нет, то задиспатчится setUsers
    // юзеры запишутся в стейт и компонент перерисуется с ними
    if (this.props.users.length === 0) {
      // после получения api приходит response, в нем сидит data, в ней массив items
      axios
        .get("https://social-network.samuraijs.com/api/1.0/users")
        .then((response) => {
          this.props.setUsers(response.data.items);
        });
    }
  }

  render() {
    return (
      <div className={classes.Users}>
        {this.props.users.map((user) => (
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
                    this.props.unfollow(user.id);
                  }}
                >
                  Unollow
                </button>
              ) : (
                <button
                  onClick={() => {
                    this.props.follow(user.id);
                  }}
                >
                  Follow
                </button>
              )}
            </div>
            <div className={classes.UserInfo}>
              <div className={classes.UserPerson}>
                <div>{user.name}</div>
                <div>{"user.status"}</div>
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
  }
}
