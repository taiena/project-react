import React, { MouseEvent } from "react";
import classes from "./ButtonNav.module.scss";

export interface IButtonProps {
  children?: React.ReactNode;
  props?: any;
  onClick?: any;
}

const ButtonNav: React.FC<IButtonProps> = ({
  children,
  onClick = () => {},
  ...props
}) => {
  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick(e);
  };
  return (
    <button className={classes.ButtonNav} onClick={handleOnClick} {...props}>
      {children}
    </button>
  );
};

export default ButtonNav;
