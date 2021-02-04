import { Field, Form, Formik } from "formik";
import React from "react";
import { FilterType } from "../../../redux/usersReducer";
import { useSelector } from "react-redux";
import { selectUserFilter } from "../../../redux/usersSelectors";
import classes from "./UsersSearchForm.module.scss";
import { Button, ButtonTypes } from "../../common/Button/Button";
import { selectField } from "../../common/FormsControls/FormsControls";

type OptionType = { label: string; value: string };

export const options: OptionType[] = [
  { value: "null", label: "All users" },
  { value: "true", label: "Friends" },
  { value: "false", label: "No friends" },
];

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
    <section className={classes.Container}>
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
              <Field className={classes.TextField} type="text" name="term" />
              <Field
                className={classes.Select}
                name="friend"
                as="select"
                component={selectField}
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
    </section>
  );
});

export default UsersSearchForm;
