import React from "react";
import classes from "./Profile.module.scss";
import PostsContainer from "./Posts/PostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { ProfileType } from "../../types/types";

type PropsType = {
  // profile: ProfileType | null;
  isOwner: boolean;
  // saveUserPhoto: (file: File) => void;
  saveUserProfile: (profile: ProfileType) => Promise<any>;
};

const Profile: React.FC<PropsType> = ({
  // profile,
  isOwner,
  // saveUserPhoto,
  saveUserProfile,
}) => {
  return (
    <main className={classes.ProfilePage}>
      <ProfileInfo
        isOwner={isOwner}
        // saveUserPhoto={saveUserPhoto}
        // profile={profile}
        saveUserProfile={saveUserProfile}
      />
      <PostsContainer />
    </main>
  );
};

export default Profile;
