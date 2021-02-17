import React from "react";
import { NavLink } from "react-router-dom";
import { Button, ButtonTypes } from "../common/Button/Button";
import classes from "./Nav.module.scss";

const links = [
  { to: "/profile", label: "PROFILE", exact: true },
  { to: "/dialogs", label: "DIALOGS", exact: true },
  { to: "/users", label: "USERS", exact: true },
  { to: "/chat", label: "CHAT", exact: true },
];

const renderLinks = () => {
  return links.map((link, index) => {
    return (
      <li key={index} className={classes.link}>
        <Button type={ButtonTypes.Nav}>
          <NavLink
            to={link.to}
            exact={link.exact}
            className={classes.unactive}
            activeClassName={classes.active}
          >
            {link.label}
          </NavLink>
        </Button>
      </li>
    );
  });
};

export default renderLinks;
