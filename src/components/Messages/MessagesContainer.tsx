import React from "react";
import Messages from "./Messages";
import { actions } from "../../redux/messagesReducer";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
  return {
    messagesPage: state.messagesPage,
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, { sendMessage: actions.sendMessage }),
  withAuthRedirect
)(Messages);
