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
    <section className={classes.dialog}>
      <NavLink to={path}>
        <div className={classes.name}>{userName}</div>
      </NavLink>
    </section>
  );
};

export default Dialog;
