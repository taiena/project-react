import React from "react";
import classes from "./Profile.module.scss";
import PostsContainer from "./Posts/PostsContainer.jsx";
import ProfileInfo from "./ProfileInfo/ProfileInfo.jsx";

const Profile = ({ profile, status, updateUserStatus }) => {
  return (
    <main className={classes.ProfilePage}>
      <ProfileInfo
        profile={profile}
        status={status}
        updateUserStatus={updateUserStatus}
      />
      <PostsContainer />
    </main>
  );
};

export default Profile;
