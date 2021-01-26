import React, { useEffect } from "react";
import classes from "./Messages.module.scss";
import Message from "./Message/Message";
import { selectMessages } from "../../../redux/dialogsSelectors";
import { useSelector, useDispatch } from "react-redux";
import AddMessageForm, {
  NewMessageFormValuesType,
} from "../../common/AddMessageForm/AddMessageForm";
import {
  getMessages,
  sendMessage,
  deleteMessage,
  spamMessage,
} from "../../../redux/dialogsReducer";

type PropsType = {
  userId: number;
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

  const deleteUserMessage = (messageId: number, userId: number) => {
    dispatch(deleteMessage(messageId, userId));
  };

  const addTospamUserMessage = (messageId: number, userId: number) => {
    dispatch(spamMessage(messageId, userId));
  };

  return (
    <div className={classes.MessagesPage}>
      <div className={classes.Messages}>
        {messages.map((message: any) => (
          <Message
            userId={userId}
            key={message.id}
            message={message}
            deleteMessage={deleteUserMessage}
            spamMessage={addTospamUserMessage}
          />
        ))}
      </div>
      <AddMessageForm
        onSubmit={addNewMessage}
        text={"send message"}
        placeholder={"Enter message here"}
      />
    </div>
  );
};

export default Messages;
