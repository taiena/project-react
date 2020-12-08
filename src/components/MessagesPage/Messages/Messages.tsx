import React from "react";
import classes from "./Messages.module.scss";
import Message from "./Message/Message";
import { selectMessages } from "../../../redux/messagesSelectors";
import { useSelector } from "react-redux";
import AddMessageForm from "../AddMessageForm/AddMessageForm";
import { useDispatch } from "react-redux";
import { actions } from "../../../redux/messagesReducer";

type PropsType = {};

export type NewMessageFormValuesType = {
  newMessageBody: string;
};

const Messages: React.FC<PropsType> = (props) => {
  const messages = useSelector(selectMessages);

  const dispatch = useDispatch();

  let addNewMessage = (values: NewMessageFormValuesType) => {
    dispatch(actions.sendMessage(values.newMessageBody));
  };

  let messagesElements = messages.map((m) => (
    <Message message={m.message} key={m.id} />
  ));

  return (
    <div className={classes.Messages}>
      <div>{messagesElements}</div>
      <AddMessageForm onSubmit={addNewMessage} />
    </div>
  );
};

export default Messages;
