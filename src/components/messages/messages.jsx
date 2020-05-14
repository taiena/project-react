import React from "react";
import classes from "./messages.module.scss";
import { NavLink } from "react-router-dom";

const Dialog = (props) => {
  let path = "/messages/" + props.id;

  return (
    <div className={classes.dialog + " " + classes.active}>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  );
};

const Message = (props) => {
  return (
    <div className={classes.message}>
      <div>{props.message}</div>
    </div>
  );
};

const Messages = () => {
  return (
    <div className={classes.messages}>
      <div className={classes.dialogList}>
        <Dialog name="Lena" id="1" />
        <Dialog name="Vova" id="2" />
      </div>
      <div className={classes.messageList}>
        <Message message="Hi" />
        <Message message="Hello" />
      </div>
    </div>
  );
};

export default Messages;
