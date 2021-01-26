import React from "react";
import classes from "./ChatMessage.module.scss";
import { ChatMessageAPIType } from "../../../../api/chatApi";

const ChatMessage: React.FC<{ message: ChatMessageAPIType }> = React.memo(
  ({ message }) => {
    return (
      <div>
        <hr />
        <div className={classes.Message}>
          <div className={classes.Photo}>
            <img src={message.photo} alt={message.userName} />
          </div>
          <div className={classes.MessageBlock}>
            <div className={classes.Name}>{message.userName}</div>
            <div>{message.message}</div>
          </div>
        </div>
      </div>
    );
  }
);

export default ChatMessage;
