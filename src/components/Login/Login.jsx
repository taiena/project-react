import React from "react";
import classes from "./Login.module.scss";
import { Field, reduxForm } from "redux-form";
import { required, maxLengthCreator } from "../../utils/validators/validators";
import { Input } from "../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10);

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Input}
          placeholder={"Login"}
          name={"login"}
          validate={[required, maxLength10]}
        />
      </div>
      <div>
        <Field
          component={Input}
          placeholder={"Password"}
          name={"password"}
          validate={[required, maxLength10]}
        />
      </div>
      <div>
        <Field
          component={Input}
          type={"checkbox"}
          name={"rememberMe"}
          validate={[required]}
        />{" "}
        remember me
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

// в LoginForm передается в пропсах функция handleSubmit
const LoginReduxForm = reduxForm({
  form: "login",
})(LoginForm);

const Login = (props) => {
  // в onSubmit придут все значения из форм (formData)
  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <div className={classes.Login}>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
