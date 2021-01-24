import React from "react";
import classes from "./Button.module.scss";

enum ButtonTypes {
  Nav = "Nav",
  Login = "Login",
  InterfaceType1 = "InterfaceType1",
  InterfaceType2 = "InterfaceType2",
}
interface IButtonProps {
  children?: React.ReactNode;
  text?: string;
  type: ButtonTypes;
  onClick?: () => void;
  disabled?: boolean;
}
const Button = ({ children, text, type, onClick, disabled }: IButtonProps) => {
  return (
    <button
      className={`${classes.Button} ${classes[type]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text} {children}
    </button>
  );
};

export { Button, ButtonTypes };
