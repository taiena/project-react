import React from "react";
import Messages from "./messages.jsx";
import {
  updateNewMessageBodyCreator,
  sendMessageCreator,
} from "../../redux/messagesReducer.js";

import { connect } from "react-redux";

let mapStateToProps = (state) => {
  return {
    messagesPage: state.messagesPage,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    updateNewMessageBody: (body) => {
      dispatch(updateNewMessageBodyCreator(body));
    },
    sendMessage: () => {
      dispatch(sendMessageCreator());
    },
  };
};

// connect создает контейнерную компоненту,
// внутри нее рендерит презентационную компоненту,
// внутрь которой в качестве пропсов передает свойства,
// которые сидят в mapStateToProps, mapDispatchToProps
// каждый раз при изменениях в стейте запускается mapStateToProps
// и формируется новый объект

const MessagesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);

export default MessagesContainer;
