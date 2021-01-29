import React from "react";
import classes from "./Login.module.scss";
import styles from "../common/FormsControls/FormsControls.module.scss";
import { InjectedFormProps, reduxForm } from "redux-form";
import {
  createField,
  GetStringKeys,
  Input,
} from "../common/FormsControls/FormsControls";
import { required, maxLengthCreator } from "../../utils/validators/validators";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authReducer";
import { Redirect } from "react-router-dom";
import { AppStateType } from "../../redux/redux-store";
import { Button, ButtonTypes } from "../common/Button/Button";
// import { Field } from "redux-form";

const maxLength30 = maxLengthCreator(30);

type LoginFormOwnProps = {
  captchaUrl: string | null;
};

// LoginFormOwnProps indicate 2 times: for own and for redux-form library
const LoginForm: React.FC<
  InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps
> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit} className={classes.Form}>
      {/* placeholder, name, validate, component */}

      <div className={classes.Email}>
        <div className={classes.Title}>Enter your email: </div>
        {createField<LoginFormValuesTypeKeys>(
          "Email",
          "email",
          [required, maxLength30],
          Input
        )}
      </div>
      <div className={classes.Password}>
        <div className={classes.Title}>Enter your password: </div>
        {createField<LoginFormValuesTypeKeys>(
          "Password",
          "password",
          [required, maxLength30],
          Input,
          { type: "password" }
        )}
      </div>

      <div className={classes.Remember}>
        {/* <div className={classes.RememberTitle}>Remember me:</div> */}
        <div className={classes.RememberCheckbox}>
          {/* <Field
            name="rememberMe"
            component="input"
            type="checkbox"
            id="loginremember"
          /> */}
          {createField<LoginFormValuesTypeKeys>(
            undefined, // placeholder
            "rememberMe", //name
            [], // validate
            Input, // component
            { type: "checkbox", id: "loginremember" }, // {...props}
            "remember me" // text
          )}

          {/* <label htmlFor="loginremember" /> */}
        </div>
      </div>

      {captchaUrl && <img src={captchaUrl} alt="" />}
      {captchaUrl &&
        createField<LoginFormValuesTypeKeys>(
          "Symbols from image",
          "captcha",
          [required],
          Input,
          {}
        )}

      {error && <div className={styles.formSummaryError}>{error}</div>}
      <div>
        <Button type={ButtonTypes.InterfaceType1} text="login" />
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
  form: "login",
})(LoginForm);

export type LoginFormValuesType = {
  captcha: string;
  rememberMe: boolean;
  password: string;
  email: string;
};
type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>;

const LoginPage: React.FC = () => {
  const captchaUrl = useSelector(
    (state: AppStateType) => state.auth.captchaUrl
  );
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const dispatch = useDispatch();

  const onSubmit = (formData: LoginFormValuesType) => {
    dispatch(
      login(
        formData.email,
        formData.password,
        formData.rememberMe,
        formData.captcha
      )
    );
  };

  if (isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div className={classes.Container}>
      <section className={classes.Login}>
        <h1>LOGIN</h1>
        <div className={classes.FormWrapper}>
          <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
