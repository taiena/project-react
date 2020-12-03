import React from "react";
import classes from "./Profile.module.scss";
import Posts from "./Posts/Posts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type PropsType = {
  isOwner: boolean;
};

const Profile: React.FC<PropsType> = ({ isOwner }) => {
  return (
    <main className={classes.ProfilePage}>
      <ProfileInfo isOwner={isOwner} />
      <Posts />
    </main>
  );
};

export default Profile;
