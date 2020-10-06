import React from "react";
import classes from "./Profile.module.scss";
import PostsContainer from "./Posts/PostsContainer.jsx";
import ProfileInfo from "./ProfileInfo/ProfileInfo.jsx";

const Profile = (props) => {
  return (
    <main className={classes.ProfilePage}>
      <ProfileInfo profile={props.profile} />
      <PostsContainer />
    </main>
  );
};

export default Profile;
