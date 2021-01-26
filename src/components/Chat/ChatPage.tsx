import React, { useEffect, useState, useRef } from "react";
import classes from "./ChatPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  startMessagesListening,
  stopMessagesListening,
  sendMessage,
} from "../../redux/chatReducer";

import { AppStateType } from "../../redux/redux-store";
import ChatMessages from "./ChatMessages/ChatMessages";
import AddMessageForm, {
  NewMessageFormValuesType,
} from "../common/AddMessageForm/AddMessageForm";

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: React.FC = () => {
  const dispatch = useDispatch();

  const status = useSelector((state: AppStateType) => state.chat.status);

  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);

  let addNewMessage = (values: NewMessageFormValuesType) => {
    if (!values.body) {
      return;
    }
    dispatch(sendMessage(values.body));
  };

  return (
    <div className={classes.Chat}>
      {status === "error" && (
        <div>Some error occured. Please refresh the page</div>
      )}
      <>
        <ChatMessages />
        <AddMessageForm
          onSubmit={addNewMessage}
          status={status}
          text={"send message"}
          placeholder={"Enter message here"}
        />
      </>
    </div>
  );
};

export default ChatPage;
