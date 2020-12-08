import React from "react";
import classes from "./Dialogs.module.scss";
import Dialog from "./Dialog/Dialog";
import { selectDialogs } from "../../../redux/messagesSelectors";
import { useSelector } from "react-redux";

type PropsType = {};

const Dialogs: React.FC<PropsType> = (props) => {
  const dialogs = useSelector(selectDialogs);

  let dialogsElements = dialogs.map((d) => (
    <Dialog name={d.name} id={d.id} key={d.id} />
  ));

  return (
    <div className={classes.Dialogs}>
      <div>{dialogsElements}</div>
    </div>
  );
};

export default Dialogs;
