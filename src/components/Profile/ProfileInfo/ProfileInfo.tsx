import React, { ChangeEvent, useState, useRef } from "react";
import classes from "./ProfileInfo.module.scss";
import Preloader from "../../common/Preloader/Preloader";
import userAva from "../../../assets/images/ava.svg";
import ProfileStatusHooks from "./ProfileStatusHooks";
import ProfileDataFormReduxForm from "./ProfileDataForm";
import { ContactsType, ProfileType } from "../../../types/types";
import { selectProfile } from "../../../redux/profileSelectors";
import { useSelector, useDispatch } from "react-redux";
import { saveUserPhoto, saveUserProfile } from "../../../redux/profileReducer";
import { Button, ButtonTypes } from "../../common/buttons/Button/Button";
import Dropzone from "react-dropzone";

type PropsType = {
  isOwner: boolean;
};

const ProfileInfo: React.FC<PropsType> = ({ isOwner }) => {
  const inputPhoto = useRef<HTMLInputElement>(null);
  const onBtnClickLoadPhoto = () => {
    if (inputPhoto && inputPhoto.current) {
      inputPhoto.current.click();
    }
  };

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

  const onMainPhotoDropped = (files: any) => {
    if (files?.length) {
      savePhoto(files[0]);
    }
  };

  const onSubmit = (formData: ProfileType) => {
    saveProfile(formData);
    setEditMode(false);
  };

  return (
    <section className={classes.ProfileContainer}>
      <div className={classes.ProfilePhoto}>
        <div>
          <img
            src={profile.photos.large || userAva}
            className={classes.ProfileImage}
            alt=""
          />
        </div>
        {isOwner && (
          <div className={classes.EditPhotoBtn}>
            <div>
              <input
                ref={inputPhoto}
                type="file"
                onChange={onMainPhotoSelected}
              />

              <Button
                onClick={onBtnClickLoadPhoto}
                type={ButtonTypes.InterfaceType2}
                text="load photo"
              />
            </div>
            <div>
              <Dropzone onDrop={(files: any) => onMainPhotoDropped(files)}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className={classes.Dropzone}>Or drop file here</div>
                  </div>
                )}
              </Dropzone>
            </div>
          </div>
        )}
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
      <div className={classes.ProfileUpperSection}>
        <div className={classes.ProfileMainData}>
          <h2>{profile.fullName}</h2>
          <ProfileStatusHooks />
        </div>

        <div>
          {isOwner && (
            <Button
              type={ButtonTypes.InterfaceType2}
              text="edit profile"
              onClick={goToEditMode}
            />
          )}
        </div>
      </div>
      <hr />

      <div className={classes.ProfileLowerSection}>
        <div className={classes.ProfileSecondData}>
          <div className={classes.ProfileAbout}>
            <b>About me: </b>
            {profile.aboutMe}
          </div>

          <div className={classes.ProfileJob}>
            <div>
              <span className={classes.ProfileJobTitle}>
                Looking for a job:{" "}
              </span>
              {profile.lookingForAJob ? "yes" : "no"}
            </div>
            {profile.lookingForAJob && (
              <div>
                <span className={classes.ProfileJobTitle}>
                  My professional skills:{" "}
                </span>
                {profile.lookingForAJobDescription}
              </div>
            )}
          </div>
        </div>

        <div className={classes.ProfileContacts}>
          <b>My contacts: </b>
          <div className={classes.ProfileContactsList}>
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
        </div>
      </div>
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
    <div className={classes.ProfileContact}>
      <span className={classes.ProfileContactTitle}>
        {contactTitle}: &nbsp;
      </span>
      {contactValue}
    </div>
  );
};

export default ProfileInfo;
