import React from "react";
import classes from "./Profile.module.scss";
import PostsContainer from "./Posts/PostsContainer.jsx";
import ProfileInfo from "./ProfileInfo/ProfileInfo.jsx";
import ProfileHeader from "./ProfileHeader/ProfileHeader.jsx";

const Profile = (props) => {
  return (
    <main className={classes.ProfilePage}>
      <ProfileHeader />
      <ProfileInfo />
      <PostsContainer />
    </main>
  );
};

export default Profile;
