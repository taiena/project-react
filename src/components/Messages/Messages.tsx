import React from "react";
import classes from "./Messages.module.scss";
import Message from "./Message/Message";
import Dialog from "./Dialog/Dialog";
import AddMessageForm from "./AddMessageForm/AddMessageForm";
import { selectMessages, selectDialogs } from "../../redux/messagesSelectors";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../redux/messagesReducer";

type PropsType = {};

export type NewMessageFormValuesType = {
  newMessageBody: string;
};

const Messages: React.FC<PropsType> = (props) => {
  const messages = useSelector(selectMessages);
  const dialogs = useSelector(selectDialogs);

  const dispatch = useDispatch();

  let addNewMessage = (values: NewMessageFormValuesType) => {
    dispatch(actions.sendMessage(values.newMessageBody));
  };

  let dialogsElements = dialogs.map((d) => (
    <Dialog name={d.name} id={d.id} key={d.id} />
  ));

  let messagesElements = messages.map((m) => (
    <Message message={m.message} key={m.id} />
  ));

  return (
    <div className={classes.messages}>
      <div className={classes.dialogList}>{dialogsElements}</div>
      <div className={classes.messageList}>
        {messagesElements}
        <AddMessageForm onSubmit={addNewMessage} />
      </div>
    </div>
  );
};

export default Messages;
