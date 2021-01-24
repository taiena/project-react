import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import {
  GetStringKeys,
  createField,
  Textarea,
} from "../../../common/FormsControls/FormsControls";
import { maxLengthCreator } from "../../../../utils/validators/validators";
import { Button, ButtonTypes } from "../../../common/Button/Button";
import classes from "../Posts.module.scss";

type PropsType = {};

export type AddPostFormValuesType = {
  newPostBody: string;
};
type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>;

const maxLength80 = maxLengthCreator(80);

const AddPostForm: React.FC<
  InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType
> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={classes.Form}>
        <div>
          {createField<AddPostFormValuesTypeKeys>(
            "Enter your post",
            "newPostBody",
            [maxLength80],
            Textarea
          )}
        </div>

        <div>
          <Button type={ButtonTypes.InterfaceType1} text="Add post" />
        </div>
      </div>
    </form>
  );
};

export default reduxForm<AddPostFormValuesType, PropsType>({
  form: "profile-add-post",
})(AddPostForm);
