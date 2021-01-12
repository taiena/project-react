import React, { MouseEvent } from "react";
import classes from "./Button.module.scss";

export interface IButtonProps {
  children?: React.ReactNode;
  props?: any;
  onClick?: any;
}

const Button: React.FC<IButtonProps> = ({
  children,
  onClick = () => {},
  ...props
}) => {
  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick(e);
  };
  return (
    <button className={classes.Button} onClick={handleOnClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
