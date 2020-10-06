import React from "react";
import classes from "./ProfileInfo.module.scss";
import Preloader from "../../common/Preloader/Preloader";
import userAva from "../../../assets/images/ava.png";

const ProfileInfo = (props) => {
  // console.log("from profileInfo: ", props);
  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <div className={classes.ProfileContainer}>
      <div className={classes.ProfilePhoto}>
        <img
          src={
            props.profile.photos.large != null
              ? props.profile.photos.large
              : userAva
          }
          alt=""
        />
      </div>
      <div className={classes.ProfileInfo}>
        <div>
          <h3>{props.profile.fullName}</h3>
        </div>
        <div>{props.profile.aboutMe}</div>
        <div className={classes.ProfileContacts}>
          <div>{props.profile.contacts.facebook}</div>
          <div>{props.profile.contacts.website}</div>
          <div>{props.profile.contacts.vk}</div>
          <div>{props.profile.contacts.twitter}</div>
          <div>{props.profile.contacts.instagram}</div>
          <div>{props.profile.contacts.youtube}</div>
          <div>{props.profile.contacts.github}</div>
          <div>{props.profile.contacts.mainLink}</div>
        </div>
        <div>Ищу работу: {props.profile.lookingForAJob}</div>
        <div>{props.profile.lookingForAJobDescription}</div>
      </div>
    </div>
  );
};

export default ProfileInfo;
