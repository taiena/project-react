import React, { useState } from "react";
import classes from "./Nav.module.scss";
import ButtonHamburger from "./ButtonHamburger/ButtonHamburger";
import renderLinks from "./NavData";
import Backdrop from "./Backdrop/Backdrop";
import WindowDimensions from "../../utils/windowDimensions";

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

  let windowWidth = WindowDimensions();

  if (windowWidth.width > 767 && isMenuOpen) {
    closeMenuMode();
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
