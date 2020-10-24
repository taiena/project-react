import React from "react";
import classes from "./ProfileInfo.module.scss";
import Preloader from "../../common/Preloader/Preloader";
import userAva from "../../../assets/images/ava.png";
import ProfileStatusHooks from "./ProfileStatusHooks";

const ProfileInfo = ({ profile, status, updateUserStatus }) => {
  if (!profile) {
    return <Preloader />;
  }
  return (
    <div className={classes.ProfileContainer}>
      <div className={classes.ProfilePhoto}>
        <img
          src={profile.photos.large != null ? profile.photos.large : userAva}
          alt=""
        />
      </div>
      <div className={classes.ProfileInfo}>
        <h3>{profile.fullName}</h3>
        <ProfileStatusHooks
          status={status}
          updateUserStatus={updateUserStatus}
        />
        <div>{profile.aboutMe}</div>
        <div className={classes.ProfileContacts}>
          <div>{profile.contacts.facebook}</div>
          <div>{profile.contacts.website}</div>
          <div>{profile.contacts.vk}</div>
          <div>{profile.contacts.twitter}</div>
          <div>{profile.contacts.instagram}</div>
          <div>{profile.contacts.youtube}</div>
          <div>{profile.contacts.github}</div>
          <div>{profile.contacts.mainLink}</div>
        </div>
        <div>Ищу работу: {profile.lookingForAJob}</div>
        <div>{profile.lookingForAJobDescription}</div>
      </div>
    </div>
  );
};

export default ProfileInfo;
