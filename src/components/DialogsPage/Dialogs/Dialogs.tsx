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
    <div className={classes.Container}>
      <div className={classes.Dialogs}>
        {dialogs.map((d: any) => (
          <Dialog
            userName={d.userName}
            id={d.id}
            key={d.id}
            hasNewMessages={d.hasNewMessages}
            lastDialogActivityDate={d.lastDialogActivityDate}
            lastUserActivityDate={d.lastUserActivityDate}
            newMessagesCount={d.newMessagesCount}
            photos={d.photos}
          />
        ))}
      </div>
    </div>
  );
};

export default Dialogs;
