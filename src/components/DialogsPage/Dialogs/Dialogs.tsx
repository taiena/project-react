import React, { useEffect } from "react";
import classes from "./Dialogs.module.scss";
import Dialog from "./Dialog/Dialog";
import { selectDialogs } from "../../../redux/dialogsSelectors";
import { useSelector, useDispatch } from "react-redux";
import { getDialogs } from "../../../redux/dialogsReducer";

type PropsType = {};

const Dialogs: React.FC<PropsType> = (props) => {
  const dialogs = useSelector(selectDialogs);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDialogs());
  }, []);

  return (
    <div className={classes.Dialogs}>
      <h3>Dialogs</h3>
      {dialogs.map((d: any) => (
        <Dialog name={d.userName} id={d.id} key={d.id} />
      ))}
    </div>
  );
};

export default Dialogs;
