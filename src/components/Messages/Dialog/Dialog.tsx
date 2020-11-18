import React from "react";
import classes from "./Dialog.module.scss";
import { NavLink } from "react-router-dom";

type PropsType = {
  id: number;
  name: string;
};

const Dialog: React.FC<PropsType> = (props) => {
  let path = "/messages/" + props.id;

  return (
    <div className={classes.dialog + " " + classes.active}>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  );
};

export default Dialog;
