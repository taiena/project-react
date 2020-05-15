import React from "react";
import classes from "./message.module.scss";

const Message = (props) => {
  return (
    <div className={classes.message}>
      <div>{props.message}</div>
    </div>
  );
};

export default Message;
