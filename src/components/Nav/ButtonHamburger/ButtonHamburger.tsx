import React from "react";
import classes from "./ButtonHamburger.module.scss";

export type PropsType = {
  isMenuOpen: boolean;
  toggleMenuMode: () => void;
};

const ButtonHamburger: React.FC<PropsType> = ({
  isMenuOpen,
  toggleMenuMode,
}) => {
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
