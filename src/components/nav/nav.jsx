import React from "react";
import classes from "./nav.module.scss";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className={classes.nav}>
      <ul>
        {/* <li className={`${classes.link} ${classes.active}`}> */}
        <li className={classes.link}>
          <NavLink to="/profile" activeClassName={classes.active}>
            Profile
          </NavLink>
        </li>
        <li className={classes.link}>
          <NavLink to="/messages" activeClassName={classes.active}>
            Messages
          </NavLink>
        </li>
        <li className={classes.link}>
          <NavLink to="/users" activeClassName={classes.active}>
            Find Users
          </NavLink>
        </li>
        <li className={classes.link}>
          <NavLink to="/photos" activeClassName={classes.active}>
            Photos
          </NavLink>
        </li>
        <li className={classes.link}>
          <NavLink to="/music" activeClassName={classes.active}>
            Music
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
