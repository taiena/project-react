import React from "react";
import classes from "./Header.module.scss";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  console.log("from header: ", props);
  return (
    <header className={classes.Header}>
      <div>Header is here</div>
      <div className={classes.LoginBlock}>
        {props.isAuth ? props.login : <NavLink to={"/login"}>Login</NavLink>}
      </div>
    </header>
  );
};

export default Header;
