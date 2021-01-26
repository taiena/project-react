import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, Textarea } from "../FormsControls/FormsControls";
import { maxLengthCreator } from "../../../utils/validators/validators";
import { Button, ButtonTypes } from "../Button/Button";
import classes from "./AddMessageForm.module.scss";

const maxLength100 = maxLengthCreator(100);

type NewMessageFormValuesKeysType = Extract<
  keyof NewMessageFormValuesType,
  string
>;

export type NewMessageFormValuesType = {
  body: string;
};

type PropsType = {
  status?: string;
  text?: string;
  placeholder?: string;
};

const AddMessageForm: React.FC<
  InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType
> = (props) => {
  console.log(props.status);

  return (
    <form onSubmit={props.handleSubmit}>
      <div className={classes.Form}>
        <div>
          {createField<NewMessageFormValuesKeysType>(
            props.placeholder,
            "body",
            [maxLength100],
            Textarea
          )}
        </div>
        <div>
          {props.status ? (
            <Button
              type={ButtonTypes.InterfaceType1}
              disabled={props.status !== "ready"}
              text={props.text}
            />
          ) : (
            <Button type={ButtonTypes.InterfaceType1} text={props.text} />
          )}
        </div>
      </div>
    </form>
  );
};

export default reduxForm<NewMessageFormValuesType, PropsType>({
  form: "add-message-form",
})(AddMessageForm);
