import React from "react";
import classes from "./messages.module.scss";
import { NavLink } from "react-router-dom";

const Messages = () => {
  return (
    <div className={classes.messages}>
      <div className={classes.dialogList}>
        <div className={classes.dialog + " " + classes.active}>
          <NavLink to="/messages/1">Lena</NavLink>
        </div>
        <div className={classes.dialog}>
          <NavLink to="/messages/2">Vova</NavLink>
        </div>
      </div>
      <div className={classes.messageList}>
        <div className={classes.message}>Hi</div>
        <div className={classes.message}>Hello</div>
      </div>
    </div>
  );
};

export default Messages;
