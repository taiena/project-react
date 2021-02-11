import React, { useState } from "react";
import classes from "./Nav.module.scss";
import ButtonHamburger from "./ButtonHamburger/ButtonHamburger";
import renderLinks from "./NavData";

const NavFloat: React.FC = () => {
  const [isMenuOpen, toggleMenu] = useState(false);

  function toggleMenuMode() {
    toggleMenu(!isMenuOpen);
  }

  const cls = [classes.NavFloat];

  if (!isMenuOpen) {
    cls.push(classes.Close);
  }

  return (
    <div className={classes.NavFloatContainer}>
      <ButtonHamburger
        isMenuOpen={isMenuOpen}
        toggleMenuMode={toggleMenuMode}
      />

      <nav className={cls.join(" ")}>
        <ul>{renderLinks()}</ul>
      </nav>
    </div>
  );
};

export default NavFloat;
