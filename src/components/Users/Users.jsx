import React from "react";
import classes from "./Users.module.scss";
import userAva from "../../assets/images/ava.png";

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
        {pages.map((page) => {
          return (
            <span
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
