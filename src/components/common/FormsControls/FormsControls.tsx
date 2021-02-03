import React from "react";
import classes from "./FormsControls.module.scss";
import { FieldValidatorType } from "../../../utils/validators/validators";
import { Field, WrappedFieldProps } from "redux-form";
import { WrappedFieldMetaProps } from "redux-form/lib/Field";
import { FieldProps } from "formik";
import Select from "react-select";

// with the FormControl function, you can wrap some input,
// it will add the error class to the div in which the input is nested
// and display the span with an error

// props: input {...}, meta {touched, error, warning}, placeholder, children

type FormControlPropsType = {
  meta: WrappedFieldMetaProps;
};

interface IProps {
  label: string;
}

const FormControl: React.FC<FormControlPropsType> = ({
  meta: { touched, error },
  children,
}) => {
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

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
  //const {input, meta, child, ...restProps} = props;
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};

export const Input: React.FC<WrappedFieldProps> = (props) => {
  //const {input, meta, child, ...restProps} = props;
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <label>
        <input {...input} {...restProps} />
        <span></span>
      </label>
    </FormControl>
  );
};

export function createField<FormKeysType extends string>(
  placeholder: string | undefined,
  name: FormKeysType,
  validators: Array<FieldValidatorType>,
  component: React.FC<WrappedFieldProps & IProps>,
  props = {},
  text = ""
) {
  return (
    <>
      <Field
        placeholder={placeholder}
        name={name}
        validate={validators}
        component={component}
        {...props}
      />{" "}
      {text}
    </>
  );
}

export function selectField({
  field, // { name, value, onChange, onBlur }
  form: { setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}: FieldProps & {
  label: string;
  options: Array<{ value: boolean | null; label: string }>;
}) {
  const { options } = props;

  return (
    <Select
      {...field}
      {...props}
      options={options}
      name={field.name}
      value={
        (options
          ? options.find((option) => option.value === field.value)
          : "") as any
      }
      onChange={(option) => setFieldValue(field.name, option.value)}
      onBlur={field.onBlur}
    />
  );
}

export type GetStringKeys<T> = Extract<keyof T, string>;
