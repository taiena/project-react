import React, { ChangeEvent, useState } from "react";
import classes from "./ProfileInfo.module.scss";
import Preloader from "../../common/Preloader/Preloader";
import userAva from "../../../assets/images/ava.png";
import ProfileStatusHooks from "./ProfileStatusHooks";
import ProfileDataFormReduxForm from "./ProfileDataForm";
import { ContactsType, ProfileType } from "../../../types/types";
import { selectProfile } from "../../../redux/profileSelectors";
import { useSelector, useDispatch } from "react-redux";
import { saveUserPhoto, saveUserProfile } from "../../../redux/profileReducer";

type PropsType = {
  isOwner: boolean;
};

const ProfileInfo: React.FC<PropsType> = ({ isOwner }) => {
  const profile = useSelector(selectProfile);

  const dispatch = useDispatch();

  const savePhoto = (file: File) => {
    dispatch(saveUserPhoto(file));
  };

  const saveProfile = (profile: ProfileType) => {
    dispatch(saveUserProfile(profile));
  };

  let [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData: ProfileType) => {
    saveProfile(formData);
    setEditMode(false);
  };

  return (
    <section className={classes.ProfileContainer}>
      <div className={classes.ProfilePhoto}>
        <img
          src={profile.photos.large || userAva}
          className={classes.ProfileImage}
          alt=""
        />

        {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
      </div>

      {editMode ? (
        <ProfileDataFormReduxForm
          initialValues={profile}
          profile={profile}
          onSubmit={onSubmit}
        />
      ) : (
        <ProfileData
          goToEditMode={() => {
            setEditMode(true);
          }}
          profile={profile}
          isOwner={isOwner}
        />
      )}

      <ProfileStatusHooks />
    </section>
  );
};

type ProfileDataPropsType = {
  profile: ProfileType;
  isOwner: boolean;
  goToEditMode: () => void;
};

const ProfileData: React.FC<ProfileDataPropsType> = ({
  profile,
  isOwner,
  goToEditMode,
}) => {
  return (
    <div className={classes.ProfileInfo}>
      <h2>{profile.fullName}</h2>

      <div className={classes.ProfileAbout}>
        <b>About me: </b>
        {profile.aboutMe}
      </div>
      <div className={classes.ProfileContacts}>
        <b>My contacts: </b>
        {Object.keys(profile.contacts).map((key) => {
          return (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={profile.contacts[key as keyof ContactsType]}
            />
          );
        })}
      </div>
      <div className={classes.ProfileJob}>
        <div>
          <b>Looking for a job: </b>
          {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {profile.lookingForAJob && (
          <div>
            <b>My professional skills: </b>
            {profile.lookingForAJobDescription}
          </div>
        )}
      </div>
      {isOwner && (
        <div>
          <button onClick={goToEditMode}>edit</button>
        </div>
      )}
    </div>
  );
};

type ContactsPropsType = {
  contactTitle: string;
  contactValue: string;
};

const Contact: React.FC<ContactsPropsType> = ({
  contactTitle,
  contactValue,
}) => {
  return (
    <div>
      <span>{contactTitle}: </span>
      {contactValue}
    </div>
  );
};

export default ProfileInfo;
