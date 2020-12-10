import React, { useEffect } from "react";
import classes from "./Messages.module.scss";
import Message from "./Message/Message";
import { selectMessages } from "../../../redux/dialogsSelectors";
import { useSelector } from "react-redux";
import AddMessageForm from "./AddMessageForm/AddMessageForm";
import { useDispatch } from "react-redux";
import { actions, getMessages } from "../../../redux/dialogsReducer";

type PropsType = {};

export type NewMessageFormValuesType = {
  newMessageBody: string;
};

const Messages: React.FC<PropsType> = (userId) => {
  const messages = useSelector(selectMessages);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getMessages(userId));
  // }, []);

  let addNewMessage = (userId: number, values: NewMessageFormValuesType) => {
    dispatch(actions.sendMessage(userId, values.newMessageBody));
  };

  let messagesElements = messages.map((m) => (
    <Message message={m.message} key={m.id} />
  ));

  return (
    <div className={classes.Messages}>
      <div>{messagesElements}</div>
      {/* <AddMessageForm onSubmit={addNewMessage} /> */}
    </div>
  );
};

export default Messages;
