import React from "react";
import classes from "./MessagesPage.module.scss";
import Messages from "./Messages/Messages";
import Dialogs from "./Dialogs/Dialogs";

type PropsType = {};

const MessagesPage: React.FC<PropsType> = (props) => {
  return (
    <div className={classes.MessagesPage}>
      <Dialogs />
      <Messages />
    </div>
  );
};

export default MessagesPage;
