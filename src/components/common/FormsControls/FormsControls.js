import React from "react";
import classes from "./FormsControls.module.scss";

// props: input {...}, meta {touched, error, warning}, placeholder, child
// деструктуризация: достаем инпут и мета, остальное оставим в пропсах
const FormControl = ({ input, meta, child, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div
      className={classes.formsControls + " " + (hasError ? classes.error : "")}
    >
      <div>{props.children}</div>
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};

export const Textarea = (props) => {
  const { input, meta, child, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};

export const Input = (props) => {
  const { input, meta, child, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};
