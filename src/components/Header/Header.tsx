import React from "react";
import classes from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import { selectIsAuth, selectLogin } from "../../redux/authSelectors";
import { logout } from "../../redux/authReducer";
import { useSelector, useDispatch } from "react-redux";
import { Button, ButtonTypes } from "../common/Button/Button";

export type PropsType = {
  changeTheme: () => void;
};

const Header: React.FC<PropsType> = ({ changeTheme }) => {
  const isAuth = useSelector(selectIsAuth);
  const login = useSelector(selectLogin);

  const dispatch = useDispatch();

  const logoutCallback = () => {
    dispatch(logout());
  };

  return (
    <header className={classes.Header}>
      <div className={classes.Logo}>
        <span className={classes.LogoSocial}>SOCIAL</span>
        <span className={classes.LogoDev}>DEV</span>
      </div>
      <div className={classes.Theme}>
        <span onClick={changeTheme}>change theme</span>
      </div>

      <div className={classes.LoginBlock}>
        {isAuth ? (
          <div className={classes.Logined}>
            <div className={classes.Login}>{login}</div>
            <Button
              onClick={logoutCallback}
              type={ButtonTypes.Login}
              text="logout"
            />
          </div>
        ) : (
          <div>
            <Button type={ButtonTypes.Login}>
              <NavLink to={"/login"}>LOGIN</NavLink>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
