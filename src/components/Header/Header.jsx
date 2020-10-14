import React from "react";
import classes from "./Header.module.scss";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  console.log("props from header: ", props);
  return (
    <header className={classes.Header}>
      <div>Header is here</div>
      <div className={classes.LoginBlock}>
        {props.isAuth ? (
          <div>
            {props.login}
            <button onClick={props.logout}>Log out</button>
          </div>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
