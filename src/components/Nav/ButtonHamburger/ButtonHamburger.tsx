import React, { useContext } from "react";
import { MenuContext } from "../NavState";
import classes from "./ButtonHamburger.module.scss";

const ButtonHamburger = () => {
  const { isMenuOpen, toggleMenuMode } = useContext(MenuContext);

  const cls = [classes.Hamburger];

  const clickHandler = () => {
    toggleMenuMode();
  };

  if (isMenuOpen) {
    cls.push(classes.Active);
  }

  return (
    <div
      className={cls.join(" ")}
      aria-label="Открыть главное меню"
      onClick={clickHandler}
    >
      <span className={classes.Span} />
      <span className={classes.Span} />
      <span className={classes.Span} />
    </div>
  );
};

export default ButtonHamburger;
