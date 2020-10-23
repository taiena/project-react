import React from "react";
import classes from "./Login.module.scss";
import { reduxForm } from "redux-form";
import { required, maxLengthCreator } from "../../utils/validators/validators";
import { createField, Input } from "../common/FormsControls/FormsControls";
import { connect } from "react-redux";
import { login } from "../../redux/authReducer.js";
import { Redirect } from "react-router-dom";

const maxLength30 = maxLengthCreator(30);

// деструктуризация пропсов: вытащили handleSubmit и error
const LoginForm = ({ handleSubmit, error }) => {
  return (
    <form className={classes.Login} onSubmit={handleSubmit}>
      {/* в функцию передаем placeholder, name, validate, component, {...props}, text */}
      {createField("Email", "email", [required, maxLength30], Input)}

      {createField("Password", "password", [required, maxLength30], Input, {
        type: "password",
      })}

      {createField(
        null, // placeholder
        "rememberMe", //name
        [], // validate
        Input, // component
        { type: "checkbox" }, // {...props}
        "remember me" // text
      )}

      {error && <div className={classes.formSummaryError}>{error}</div>}
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
