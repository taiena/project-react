import React from "react";
import classes from "./ProfileHeader.module.scss";

const ProfileHeader = () => {
  return (
    <div className={classes.ProfileHeader}>
      <img
        src="https://i.baraholka.com.ru/files/1/8/1862507_5.jpg"
        alt="header pic"
      ></img>
    </div>
  );
};

export default ProfileHeader;
