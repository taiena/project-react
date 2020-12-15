import React from "react";
import classes from "./Dialog.module.scss";
import { NavLink } from "react-router-dom";

type PropsType = {
  id: number;
  userName: string;
};

const Dialog: React.FC<PropsType> = ({ userName, id, ...props }) => {
  let path = `dialogs/messages/${id}`;

  return (
    <div className={classes.dialog + " " + classes.active}>
      <NavLink to={path}>
        {userName} id: {id}{" "}
      </NavLink>
    </div>
  );
};

export default Dialog;
