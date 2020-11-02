import React, { useState } from "react";
import classes from "./ProfileInfo.module.scss";
import Preloader from "../../common/Preloader/Preloader";
import userAva from "../../../assets/images/ava.png";
import ProfileStatusHooks from "./ProfileStatusHooks";
import ProfileDataFormReduxForm from "./ProfileDataForm";

const ProfileInfo = ({
  profile,
  status,
  updateUserStatus,
  isOwner,
  saveUserPhoto,
  saveUserProfile,
}) => {
  let [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      saveUserPhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData) => {
    saveUserProfile(formData).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div className={classes.ProfileContainer}>
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

      <ProfileStatusHooks status={status} updateUserStatus={updateUserStatus} />
    </div>
  );
};

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
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
              contactValue={profile.contacts[key]}
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

const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div>
      <span>{contactTitle}: </span>
      {contactValue}
    </div>
  );
};

export default ProfileInfo;
