import React from "react";
import Messages from "./Messages";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

type MessagesPagePropsType = {};

const MessagesPage: React.FC<MessagesPagePropsType> = (props) => {
  return (
    <>
      <Messages />
    </>
  );
};

export default compose<React.ComponentType>(withAuthRedirect)(MessagesPage);
