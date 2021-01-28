import React from "react";
import classes from "./ChatMessage.module.scss";
import { ChatMessageAPIType } from "../../../../api/chatApi";
import { NavLink } from "react-router-dom";
import userAva from "../../../../assets/images/ava.svg";

const ChatMessage: React.FC<{ message: ChatMessageAPIType }> = React.memo(
  ({ message }) => {
    return (
      <div>
        <hr />
        <div className={classes.Message}>
          <div className={classes.Photo}>
            <NavLink to={"/profile/" + message.userId}>
              <img
                src={message.photo !== null ? message.photo : userAva}
                alt={message.userName}
              />
            </NavLink>
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
