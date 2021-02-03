import { Field, Form, Formik, FieldProps } from "formik";
import React from "react";
import { FilterType } from "../../../redux/usersReducer";
import { useSelector } from "react-redux";
import { selectUserFilter } from "../../../redux/usersSelectors";
import classes from "./UsersSearchForm.module.scss";
import { Button, ButtonTypes } from "../../common/Button/Button";
import Select from "react-select";

type OptionType = { label: string; value: string };

export const options: OptionType[] = [
  { value: "null", label: "All users" },
  { value: "true", label: "Friends" },
  { value: "false", label: "No friends" },
];

export const SelectField = ({
  field, // { name, value, onChange, onBlur }
  form: { setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}: FieldProps & {
  label: string;
  options: Array<{ value: boolean | null; label: string }>;
}) => {
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
};

const usersSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};

type FriendFormType = "true" | "false" | "null";

type FormType = {
  term: string;
  friend: FriendFormType;
};

type PropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
  const filter = useSelector(selectUserFilter);
  const submit = (
    values: FormType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const filter: FilterType = {
      term: values.term,
      friend: JSON.parse(values.friend),
    };

    props.onFilterChanged(filter);
    setSubmitting(false);
  };

  return (
    <div className={classes.Container}>
      <Formik
        enableReinitialize
        initialValues={{
          term: filter.term,
          friend: String(filter.friend) as FriendFormType,
        }}
        validate={usersSearchFormValidate}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={classes.SearchForm}>
              <Field type="text" name="term" />

              <Field
                name="friend"
                as="select"
                component={SelectField}
                options={options}
              />

              <Button
                type={ButtonTypes.InterfaceType1}
                disabled={isSubmitting}
                text="find"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default UsersSearchForm;
