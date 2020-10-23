import React from "react";
import classes from "./FormsControls.module.scss";
import { Field } from "redux-form";

// функцией FormControl можно обернуть какой-нибудь инпут,
// она добавит класс error диву в который вложен инпут и выведет спан с ошибкой

// props: input {...}, meta {touched, error, warning}, placeholder, children
const FormControl = ({ meta: { touched, error }, children }) => {
  const hasError = touched && error;
  return (
    <div
      className={classes.formsControls + " " + (hasError ? classes.error : "")}
    >
      <div>{children}</div>
      {hasError && <span>{error}</span>}
    </div>
  );
};

// Textarea, обернутая FormControl
export const Textarea = (props) => {
  const { input, meta, child, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};

// Input, обернутый FormControl
export const Input = (props) => {
  const { input, meta, child, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};

// функция создания поля ввода Field, вызывается в самой форме
export const createField = (
  placeholder,
  name,
  validators,
  component,
  props = {},
  text = ""
) => (
  <div className={classes.Field}>
    <Field
      placeholder={placeholder}
      name={name}
      validate={validators}
      component={component}
      {...props}
    />{" "}
    {text}
  </div>
);
