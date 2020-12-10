import React from "react";
import classes from "./Nav.module.scss";
import { NavLink } from "react-router-dom";

const Nav: React.FC = () => {
  return (
    <nav className={classes.nav}>
      <ul>
        <li className={classes.link}>
          <NavLink to="/profile" activeClassName={classes.active}>
            Profile
          </NavLink>
        </li>
        <li className={classes.link}>
          <NavLink to="/dialogs" activeClassName={classes.active}>
            Dialogs
          </NavLink>
        </li>
        <li className={classes.link}>
          <NavLink to="/users" activeClassName={classes.active}>
            Find Users
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
