import React from "react";
import classes from "./ProfileInfo.module.scss";
import styles from "../../common/FormsControls/FormsControls.module.scss";
import {
  createField,
  Input,
  Textarea,
  GetStringKeys,
} from "../../common/FormsControls/FormsControls";
import { InjectedFormProps, reduxForm } from "redux-form";
import { ProfileType } from "../../../types/types";

type PropsType = {
  profile: ProfileType;
};

type ProfileTypeKeys = GetStringKeys<ProfileType>;

const ProfileDataForm: React.FC<
  InjectedFormProps<ProfileType, PropsType> & PropsType
> = ({ profile, handleSubmit, error }) => {
  return (
    <form className={styles.ProfileInfo} onSubmit={handleSubmit}>
      <div>
        <b>Full name: </b>
        {/* placeholder, name, validate, component, {...props}, text */}
        {createField("Full name", "fullName", [], Input)}
      </div>

      <div className={classes.ProfileAbout}>
        <b>About me: </b>
        {createField("About me", "aboutMe", [], Textarea)}
      </div>

      <div className={classes.ProfileContacts}>
        <b>My contacts: </b>
        {Object.keys(profile.contacts).map((key) => {
          return (
            <div key={key}>
              <b>
                {/* placeholder = key (vk), 
                 name = "contacts." + key (contacta.vk),
                 validate = [], component = Input */}
                {key}: {createField(key, "contacts." + key, [], Input)}
              </b>
            </div>
          );
        })}
      </div>

      <div className={classes.ProfileJob}>
        <div>
          <b>Looking for a job: </b>
          {createField("", "lookingForAJob", [], Input, { type: "checkbox" })}
        </div>

        <div>
          <b>My professional skills: </b>
          {createField(
            "My professional skills",
            "lookingForAJobDescription",
            [],
            Textarea
          )}
        </div>
      </div>

      <div>
        <button>save</button>
      </div>

      {error && <div className={styles.formSummaryError}>{error}</div>}
    </form>
  );
};

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({
  form: "edit-profile",
})(ProfileDataForm);

export default ProfileDataFormReduxForm;
