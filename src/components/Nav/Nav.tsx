import React from "react";
import classes from "./Nav.module.scss";
import { NavLink } from "react-router-dom";
import ButtonNav from "../common/buttons/ButtonNav/ButtonNav";

const Nav: React.FC = () => {
  return (
    <nav className={classes.nav}>
      <ul>
        <li className={classes.link}>
          <ButtonNav>
            <NavLink to="/profile" activeClassName={classes.active}>
              PROFILE
            </NavLink>
          </ButtonNav>
        </li>
        <li className={classes.link}>
          <ButtonNav>
            <NavLink to="/dialogs" activeClassName={classes.active}>
              DIALOGS
            </NavLink>
          </ButtonNav>
        </li>
        <li className={classes.link}>
          <ButtonNav>
            <NavLink to="/users" activeClassName={classes.active}>
              USERS
            </NavLink>
          </ButtonNav>
        </li>
        <li className={classes.link}>
          <ButtonNav>
            <NavLink to="/chat" activeClassName={classes.active}>
              CHAT
            </NavLink>
          </ButtonNav>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
