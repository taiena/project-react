import React from "react";
import classes from "./Messages.module.scss";
import Message from "./Message/Message";
import Dialog from "./Dialog/Dialog";
import AddMessageForm from "./AddMessageForm/AddMessageForm";
import { InitialStateType } from "../../redux/messagesReducer";

type PropsType = {
  messagesPage: InitialStateType;
  sendMessage: (newMessageBody: string) => void;
};

export type NewMessageFormValuesType = {
  newMessageBody: string;
};

const Messages: React.FC<PropsType> = (props) => {
  let state = props.messagesPage;

  let addNewMessage = (values: NewMessageFormValuesType) => {
    props.sendMessage(values.newMessageBody);
  };

  let dialogsElements = state.dialogs.map((d) => (
    <Dialog name={d.name} id={d.id} key={d.id} />
  ));

  let messagesElements = state.messages.map((m) => (
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
