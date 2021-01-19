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
  onClick?: any;
}
const Button = ({ children, text, type, onClick = () => {} }: IButtonProps) => {
  return (
    <button className={`${classes.Button} ${classes[type]}`} onClick={onClick}>
      {text} {children}
    </button>
  );
};

export { Button, ButtonTypes };
