import React from "react";
import classes from "./Nav.module.scss";
import renderLinks from "./NavData";

const Nav: React.FC = () => {
  return (
    <nav className={classes.Nav}>
      <ul>{renderLinks()}</ul>
    </nav>
  );
};

export default Nav;
