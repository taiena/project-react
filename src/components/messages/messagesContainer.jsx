import React from "react";
import Messages from "./messages.jsx";
import {
  updateNewMessageBodyCreator,
  sendMessageCreator,
} from "../../redux/messagesReducer.js";

const MessagesContainer = (props) => {
  let state = props.store.getState().messagesPage;

  let onSendMessageClick = () => {
    props.store.dispatch(sendMessageCreator());
  };

  let onNewMessageChange = (body) => {
    props.store.dispatch(updateNewMessageBodyCreator(body));
  };

  return (
    <Messages
      updateNewMessageBody={onNewMessageChange}
      sendMessage={onSendMessageClick}
      messagesPage={state}
    />
  );
};

export default MessagesContainer;
