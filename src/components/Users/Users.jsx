import React, { Component } from "react";
import classes from "./Users.module.scss";
import * as axios from "axios";
import userAva from "../../assets/images/ava.png";

export default class Users extends Component {
  componentDidMount() {
    // после получения api приходит response, в нем сидит data, в ней массив items
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount);
      });
  }

  // при клике на номер страницы новый запрос апи с pageNumber
  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.setUsers(response.data.items);
      });
  };

  render() {
    // подсчет кол-ва страниц (всех юзеров / кол-во юзеров на странице)
    let pagesCount = Math.ceil(
      this.props.totalUsersCount / this.props.pageSize
    );
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

    return (
      <div className={classes.Users}>
        {/* вывод массива нормеров страниц */}
        <div>
          {pages.map((page) => {
            return (
              <span
                className={
                  this.props.currentPage === page && classes.selectedPage
                }
                onClick={(e) => {
                  this.onPageChanged(page);
                }}
              >
                {page}&nbsp;
              </span>
            );
          })}
        </div>

        {/* вывод массива users */}
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
  }
}
