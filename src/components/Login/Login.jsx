import React from "react";
import classes from "./Login.module.scss";
import { Field, reduxForm } from "redux-form";
import { required, maxLengthCreator } from "../../utils/validators/validators";
import { Input } from "../common/FormsControls/FormsControls";
import { connect } from "react-redux";
import { login } from "../../redux/authReducer.js";
import { Redirect } from "react-router-dom";

const maxLength30 = maxLengthCreator(30);

const LoginForm = (props) => {
  return (
    <form className={classes.Login} onSubmit={props.handleSubmit}>
      <div className={classes.Field}>
        <Field
          component={Input}
          placeholder={"Email"}
          name={"email"}
          validate={[required, maxLength30]}
        />
      </div>
      <div className={classes.Field}>
        <Field
          component={Input}
          type={"password"}
          placeholder={"Password"}
          name={"password"}
          validate={[required, maxLength30]}
        />
      </div>
      <div className={classes.Field}>
        <Field component={Input} type={"checkbox"} name={"rememberMe"} />{" "}
        remember me
      </div>
      {props.error && (
        <div className={classes.formSummaryError}>{props.error}</div>
      )}
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
    props.login(formData.email, formData.password, formData.rememberMe);
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div className={classes.Login}>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
