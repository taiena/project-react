import React from "react";
import classes from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import { selectIsAuth, selectLogin } from "../../redux/authSelectors";
import { logout } from "../../redux/authReducer";
import { useSelector, useDispatch } from "react-redux";

export type MapPropsType = {};

const Header: React.FC<MapPropsType> = (props) => {
  const isAuth = useSelector(selectIsAuth);
  const login = useSelector(selectLogin);

  const dispatch = useDispatch();

  const logoutCallback = () => {
    dispatch(logout());
  };

  return (
    <header className={classes.Header}>
      <div>Header is here</div>
      <div className={classes.LoginBlock}>
        {isAuth ? (
          <div>
            {login}
            <button onClick={logoutCallback}>Log out</button>
          </div>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
