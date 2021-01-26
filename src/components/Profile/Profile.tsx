import React from "react";
import classes from "./Profile.module.scss";
import Posts from "./Posts/Posts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type PropsType = {
  isOwner: boolean;
  userId?: number;
};

const Profile: React.FC<PropsType> = ({ isOwner, userId }) => {
  return (
    <main className={classes.ProfilePage}>
      <ProfileInfo isOwner={isOwner} userId={userId} />
      <Posts />
    </main>
  );
};

export default Profile;
