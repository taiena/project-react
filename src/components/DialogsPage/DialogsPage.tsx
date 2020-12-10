import React from "react";
import classes from "./DialogsPage.module.scss";
import Dialogs from "./Dialogs/Dialogs";

type PropsType = {};

const MessagesPage: React.FC<PropsType> = (props) => {
  return (
    <div className={classes.DialogsPage}>
      <h2>Dialogs page</h2>
      <Dialogs />
    </div>
  );
};

export default MessagesPage;
