import React from "react";
import classes from "./Message.module.scss";

type PropsType = {
  message: string;
};

const Message: React.FC<PropsType> = (props) => {
  return (
    <div className={classes.message}>
      <div>{props.message}</div>
    </div>
  );
};

export default Message;
