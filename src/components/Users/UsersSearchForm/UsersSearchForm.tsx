import { Field, Form, Formik } from "formik";
import React from "react";
import { FilterType } from "../../../redux/usersReducer";
import { useSelector } from "react-redux";
import { selectUserFilter } from "../../../redux/usersSelectors";
import classes from "./UsersSearchForm.module.scss";
import { Button, ButtonTypes } from "../../common/Button/Button";

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
      friend:
        values.friend === "null"
          ? null
          : values.friend === "true"
          ? true
          : false,
    };

    props.onFilterChanged(filter);
    setSubmitting(false);
  };

  return (
    <div>
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
            <Field type="text" name="term" />

            <Field name="friend" as="select">
              <option value="null">All users</option>
              <option value="true">Friends</option>
              <option value="false">No friends</option>
            </Field>
            <Button
              type={ButtonTypes.InterfaceType1}
              disabled={isSubmitting}
              text="find"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default UsersSearchForm;
