import React from "react";
import classes from "./Dialog.module.scss";
import { NavLink } from "react-router-dom";

type PropsType = {
  id: number;
  name: string;
};

const Dialog: React.FC<PropsType> = ({ name, id, ...props }) => {
  let path = `messages/${id}`;

  return (
    <div className={classes.dialog + " " + classes.active}>
      <NavLink to={path}>{name}</NavLink>
    </div>
  );
};

export default Dialog;
