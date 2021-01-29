import React from "react";
import classes from "./Message.module.scss";
import { MessageType } from "../../../../types/types";
import { formatDate } from "../../../../utils/formatDate";
import { Button, ButtonTypes } from "../../../common/Button/Button";
import userAva from "../../../../assets/images/ava.svg";
import { NavLink } from "react-router-dom";

type PropsType = {
  message: MessageType;
  userId: number;
  ownerId: number | null;
  ownerPhoto: string | null;
  userPhoto: string | null;
  deleteMessage: (messageId: number, userId: number) => void;
  spamMessage: (messageId: number, userId: number) => void;
};

const Message: React.FC<PropsType> = ({
  userId,
  message,
  ownerId,
  ownerPhoto,
  userPhoto,
  deleteMessage,
  spamMessage,
}) => {
  let messageDate = new Date(message.addedAt);

  return (
    <section className={classes.Message}>
      {/* <div>Message id: {message.id}</div>
      <div>senderId: {message.senderId}</div>
      <div>recipientId: {message.recipientId}</div>
      <div>Viewed: {message.viewed}</div>
      <div>translatedBody: {message.translatedBody}</div> */}

      <div className={classes.Photo}>
        {message.senderId === ownerId ? (
          <NavLink to={"/profile"}>
            <img src={ownerPhoto !== null ? ownerPhoto : userAva} alt="" />
          </NavLink>
        ) : (
          <NavLink to={"/profile/" + userId}>
            <img src={userPhoto !== null ? userPhoto : userAva} alt="" />
          </NavLink>
        )}
      </div>

      <div className={classes.MidBlock}>
        <div className={classes.Name}>{message.senderName}</div>
        {message.body}
      </div>

      <div className={classes.RightBlock}>
        <div className={classes.Date}>{formatDate(messageDate)}</div>
        <div className={classes.Buttons}>
          {userId === message.senderId && (
            <div>
              <Button
                onClick={() => {
                  spamMessage(message.id, userId);
                }}
                type={ButtonTypes.InterfaceType2}
                text="to spam"
              />
            </div>
          )}
          <div>
            <Button
              onClick={() => {
                deleteMessage(message.id, userId);
              }}
              type={ButtonTypes.InterfaceType2}
              text="delete"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Message;
