// import React from "react";
import Messages from "./Messages.jsx";
import { sendMessageCreator } from "../../redux/messagesReducer.js";

import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

let mapStateToProps = (state) => {
  return {
    messagesPage: state.messagesPage,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageBody) => {
      dispatch(sendMessageCreator(newMessageBody));
    },
  };
};

// compose закинет messages в функцию withAuthRedirect,
// результат этого направит в функцию connect

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Messages);
