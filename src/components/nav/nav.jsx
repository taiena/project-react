import React from "react";
import classes from "./nav.module.scss";

const Nav = () => {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <a className={`${classes.link} ${classes.active}`} href="google.com">
            Main
          </a>
        </li>
        <li>
          <a className={classes.link} href="google.com">
            News
          </a>
        </li>
        <li>
          <a className={classes.link} href="google.com">
            Friends
          </a>
        </li>
        <li>
          <a className={classes.link} href="google.com">
            Messages
          </a>
        </li>
        <li>
          <a className={classes.link} href="google.com">
            Photo
          </a>
        </li>
        <li>
          <a className={classes.link} href="google.com">
            Music
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
