import React from "react";
import classes from "./Login.module.scss";
import styles from "../common/FormsControls/FormsControls.module.scss";
import { reduxForm, InjectedFormProps } from "redux-form";
import { required, maxLengthCreator } from "../../utils/validators/validators";
import {
  createField,
  Input,
  GetStringKeys,
} from "../common/FormsControls/FormsControls";
import { connect } from "react-redux";
import { login } from "../../redux/authReducer";
import { Redirect } from "react-router-dom";
import { AppStateType } from "../../redux/redux-store";

const maxLength30 = maxLengthCreator(30);

type LoginFormOwnProps = {
  captchaUrl: string | null;
};

// LoginFormOwnProps indicate 2 times: for own and for redux-form library
const LoginForm: React.FC<
  InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps
> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form className={classes.Login} onSubmit={handleSubmit}>
      {/* placeholder, name, validate, component */}
      {createField<LoginFormValuesTypeKeys>(
        "Email",
        "email",
        [required, maxLength30],
        Input
      )}

      {createField<LoginFormValuesTypeKeys>(
        "Password",
        "password",
        [required, maxLength30],
        Input,
        {
          type: "password",
        }
      )}

      {createField<LoginFormValuesTypeKeys>(
        undefined, // placeholder
        "rememberMe", //name
        [], // validate
        Input, // component
        { type: "checkbox" }, // {...props}
        "remember me" // text
      )}
      <div>
        {captchaUrl && <img src={captchaUrl} />}
        {captchaUrl &&
          createField<LoginFormValuesTypeKeys>(
            "Input captcha",
            "captcha",
            [required],
            Input,
            {}
          )}
      </div>

      {error && <div className={styles.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
  form: "login",
})(LoginForm);

type MapStatePropsType = {
  captchaUrl: string | null;
  isAuth: boolean;
};

type MapDispatchPropsType = {
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
  ) => void;
};

type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>;

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  // all values ​​from forms will come to onSubmit (formData)
  const onSubmit = (formData: LoginFormValuesType) => {
    props.login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    );
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div className={classes.Login}>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, { login })(Login);
