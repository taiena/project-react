import React from "react";
import classes from "./Profile.module.scss";
import PostsContainer from "./Posts/PostsContainer.jsx";
import ProfileInfo from "./ProfileInfo/ProfileInfo.jsx";

const Profile = ({
  profile,
  status,
  updateUserStatus,
  isOwner,
  saveUserPhoto,
}) => {
  return (
    <main className={classes.ProfilePage}>
      <ProfileInfo
        isOwner={isOwner}
        saveUserPhoto={saveUserPhoto}
        profile={profile}
        status={status}
        updateUserStatus={updateUserStatus}
      />
      <PostsContainer />
    </main>
  );
};

export default Profile;
