import React, { useEffect } from "react";
import classes from "./Messages.module.scss";
import Message from "./Message/Message";
import { selectMessages } from "../../../redux/dialogsSelectors";
import { useSelector, useDispatch } from "react-redux";
import AddMessageForm from "./AddMessageForm/AddMessageForm";
import { getMessages, sendMessage } from "../../../redux/dialogsReducer";

type PropsType = {
  userId: number;
};

export type NewMessageFormValuesType = {
  body: string;
};

const Messages: React.FC<PropsType> = ({ userId }) => {
  const messages = useSelector(selectMessages);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMessages(userId));
  }, []);

  let addNewMessage = (values: NewMessageFormValuesType) => {
    let id = userId;
    dispatch(sendMessage(id, values.body));
  };

  return (
    <div className={classes.Messages}>
      <h3>Messages with user: {userId} </h3>
      <div>
        {messages.map((m: any) => (
          <Message message={m.body} key={m.id} />
        ))}
      </div>
      <AddMessageForm onSubmit={addNewMessage} />
    </div>
  );
};

export default Messages;
