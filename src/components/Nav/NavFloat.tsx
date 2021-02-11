import React, { useState } from "react";
import classes from "./Nav.module.scss";
import ButtonHamburger from "./ButtonHamburger/ButtonHamburger";
import renderLinks from "./NavData";
import Backdrop from "./Backdrop/Backdrop";

const NavFloat: React.FC = () => {
  const [isMenuOpen, toggleMenu] = useState(false);

  function toggleMenuMode() {
    toggleMenu(!isMenuOpen);
  }

  function closeMenuMode() {
    toggleMenu(false);
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

      <nav className={cls.join(" ")} onClick={closeMenuMode}>
        <ul>{renderLinks()}</ul>
      </nav>
      {isMenuOpen ? <Backdrop closeMenuMode={closeMenuMode} /> : null}
    </div>
  );
};

export default NavFloat;
