import React from "react";
import classes from "./Profile.module.scss";
import PostsContainer from "./Posts/PostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { ProfileType } from "../../types/types";

type PropsType = {
  profile: ProfileType | null;
  status: string;
  isOwner: boolean;
  updateUserStatus: (status: string) => void;
  saveUserPhoto: (file: File) => void;
  saveUserProfile: (profile: ProfileType) => Promise<any>;
};

const Profile: React.FC<PropsType> = ({
  profile,
  status,
  updateUserStatus,
  isOwner,
  saveUserPhoto,
  saveUserProfile,
}) => {
  return (
    <main className={classes.ProfilePage}>
      <ProfileInfo
        isOwner={isOwner}
        saveUserPhoto={saveUserPhoto}
        profile={profile}
        status={status}
        updateUserStatus={updateUserStatus}
        saveUserProfile={saveUserProfile}
      />
      <PostsContainer />
    </main>
  );
};

export default Profile;
