import React from "react";
import classes from "./Nav.module.scss";
import { NavLink } from "react-router-dom";
import { Button, ButtonTypes } from "../common/Button/Button";

const Nav: React.FC = () => {
  return (
    <nav className={classes.nav}>
      <ul>
        <li className={classes.link}>
          <Button type={ButtonTypes.Nav}>
            <NavLink
              to="/profile"
              className={classes.unactive}
              activeClassName={classes.active}
            >
              PROFILE
            </NavLink>
          </Button>
        </li>
        <li className={classes.link}>
          <Button type={ButtonTypes.Nav}>
            <NavLink
              to="/dialogs"
              className={classes.unactive}
              activeClassName={classes.active}
            >
              DIALOGS
            </NavLink>
          </Button>
        </li>
        <li className={classes.link}>
          <Button type={ButtonTypes.Nav}>
            <NavLink
              to="/users"
              className={classes.unactive}
              activeClassName={classes.active}
            >
              USERS
            </NavLink>
          </Button>
        </li>
        <li className={classes.link}>
          <Button type={ButtonTypes.Nav}>
            <NavLink
              to="/chat"
              className={classes.unactive}
              activeClassName={classes.active}
            >
              CHAT
            </NavLink>
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
