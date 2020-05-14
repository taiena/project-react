import React from "react";
import classes from "./nav.module.scss";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className={classes.nav}>
      <ul>
        <li className={`${classes.link} ${classes.active}`}>
          <NavLink to="/main">Main</NavLink>
        </li>
        <li className={classes.link}>
          <NavLink to="/messages">Messages</NavLink>
        </li>
        <li className={classes.link}>
          <NavLink to="/friends">Friends</NavLink>
        </li>
        <li className={classes.link}>
          <NavLink to="/photos">Photos</NavLink>
        </li>
        <li className={classes.link}>
          <NavLink to="/music">Music</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
