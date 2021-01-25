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
import { Button, ButtonTypes } from "../../common/Button/Button";
import { Field } from "redux-form";

type PropsType = {
  profile: ProfileType;
};

type ProfileTypeKeys = GetStringKeys<ProfileType>;

const ProfileDataForm: React.FC<
  InjectedFormProps<ProfileType, PropsType> & PropsType
> = ({ profile, handleSubmit, error }) => {
  return (
    <form className={classes.ProfileInfo} onSubmit={handleSubmit}>
      <div className={classes.ProfileUpperSection}>
        <div className={classes.ProfileMainData}>
          <div className={classes.ProfileDataTitle}>Full name:</div>
          {/* placeholder, name, validate, component, {...props}, text */}
          {createField("Full name", "fullName", [], Input)}
        </div>

        <div className={classes.EditBtn}>
          <Button type={ButtonTypes.InterfaceType2} text="save profile" />
        </div>
      </div>
      <hr />

      <div className={classes.ProfileLowerSection}>
        <div className={classes.ProfileSecondData}>
          <div className={classes.ProfileAbout}>
            <div className={classes.ProfileDataTitle}>About me:</div>

            {createField("About me", "aboutMe", [], Textarea)}
          </div>

          <div className={classes.ProfileJob}>
            <div className={classes.ProfileJobLooking}>
              <div className={classes.ProfileJobTitle}>Looking for a job:</div>
              <div className={classes.ProfileJobCheckbox}>
                <Field
                  name="lookingForAJob"
                  component="input"
                  type="checkbox"
                  id="checkjob"
                />{" "}
                {/* {createField("", "lookingForAJob", [], Input, {
                  type: "checkbox",
                  id: "check",
                })} */}
                <label htmlFor="checkjob" />
              </div>
            </div>

            <div className={classes.ProfileJobSkills}>
              <div className={classes.ProfileDataTitle}>
                My professional skills:
              </div>
              {createField(
                "My professional skills",
                "lookingForAJobDescription",
                [],
                Textarea
              )}
            </div>
          </div>

          <div className={classes.ProfileContacts}>
            <div className={classes.ProfileDataTitle}>My contacts:</div>
            <div className={classes.ProfileContactsList}>
              {Object.keys(profile.contacts).map((key) => {
                return (
                  <div className={classes.ProfileContactEdit} key={key}>
                    {/* placeholder = key (vk), 
                 name = "contacts." + key (contacta.vk),
                 validate = [], component = Input */}
                    {key}: {createField(key, "contacts." + key, [], Input)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {error && <div className={styles.formSummaryError}>{error}</div>}
    </form>
  );
};

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({
  form: "edit-profile",
})(ProfileDataForm);

export default ProfileDataFormReduxForm;
