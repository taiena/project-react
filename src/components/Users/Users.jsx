import React from "react";
import classes from "./Users.module.scss";
import userAva from "../../assets/images/ava.png";
import { NavLink } from "react-router-dom";
import * as axios from "axios";

let Users = (props) => {
  // подсчет кол-ва страниц (всех юзеров / кол-во юзеров на странице)
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div className={classes.Users}>
      {/* вывод массива нормеров страниц */}
      <div>
        {pages.map((page, index) => {
          return (
            <span
              key={index}
              className={props.currentPage === page && classes.selectedPage}
              onClick={(e) => {
                props.onPageChanged(page);
              }}
            >
              {page}&nbsp;
            </span>
          );
        })}
      </div>

      {/* вывод массива users */}
      {props.users.map((user) => (
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
                onClick={() => {
                  axios
                    .delete(
                      `https://social-network.samuraijs.com/api/1.0/follow/${user.id}`,
                      {
                        withCredentials: true,
                        headers: {
                          "api-key": "daefe237-92b2-4979-a1ea-fd11e7bf92f3",
                        },
                      }
                    )
                    // после получения api приходит response, в нем сидит data, в ней массив items
                    .then((response) => {
                      if (response.data.resultCode === 0) {
                        props.unfollow(user.id);
                      }
                    });
                }}
              >
                Unollow
              </button>
            ) : (
              <button
                onClick={() => {
                  axios
                    .post(
                      `https://social-network.samuraijs.com/api/1.0/follow/${user.id}`,
                      {},
                      {
                        withCredentials: true,
                        headers: {
                          "api-key": "daefe237-92b2-4979-a1ea-fd11e7bf92f3",
                        },
                      }
                    )
                    // после получения api приходит response, в нем сидит data, в ней массив items
                    .then((response) => {
                      if (response.data.resultCode === 0) {
                        props.follow(user.id);
                      }
                    });
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
