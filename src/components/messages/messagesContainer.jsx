import React from "react";
import Messages from "./messages.jsx";
import {
  updateNewMessageBodyCreator,
  sendMessageCreator,
} from "../../redux/messagesReducer.js";
import StoreContext from "../../StoreContext";

const MessagesContainer = (props) => {
  return (
    <StoreContext.Consumer>
      {(store) => {
        let state = store.getState().messagesPage;

        let onSendMessageClick = () => {
          store.dispatch(sendMessageCreator());
        };

        let onNewMessageChange = (body) => {
          store.dispatch(updateNewMessageBodyCreator(body));
        };

        return (
          <Messages
            updateNewMessageBody={onNewMessageChange}
            sendMessage={onSendMessageClick}
            messagesPage={state}
          />
        );
      }}
    </StoreContext.Consumer>
  );
};

export default MessagesContainer;
