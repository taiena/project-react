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
import { Button, ButtonTypes } from "../../common/buttons/Button/Button";
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
          <b>Full name: </b>

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
            <b>About me: </b>

            {createField("About me", "aboutMe", [], Textarea)}
          </div>

          <div className={classes.ProfileJob}>
            <div className={classes.ProfileJobLooking}>
              <div className={classes.ProfileJobTitle}>
                <b>Looking for a job: </b>
              </div>
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

          <div className={classes.ProfileContacts}>
            <b>My contacts: </b>
            <div className={classes.ProfileContactsList}>
              {Object.keys(profile.contacts).map((key) => {
                return (
                  <div key={key}>
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
