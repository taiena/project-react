import React from "react";
import classes from "./Message.module.scss";
import { MessageType } from "../../../../types/types";

type PropsType = {
  message: MessageType;
  deleteMessage: (messageId: number, userId: number) => void;
  spamMessage: (messageId: number, userId: number) => void;
  userId: number;
};

const Message: React.FC<PropsType> = ({
  userId,
  message,
  deleteMessage,
  spamMessage,
}) => {
  // const Message: React.FC<PropsType> = ({ message }) => {
  return (
    <div className={classes.message}>
      <div>Message id: {message.id}</div>
      <div>Message body: {message.body}</div>
      <div>translatedBody: {message.translatedBody}</div>
      <div>senderId: {message.senderId}</div>
      <div>senderName: {message.senderName}</div>
      <div>recipientId: {message.recipientId}</div>
      <div>Date: {message.addedAt}</div>
      <div>Viewed: {message.viewed}</div>

      <button
        onClick={() => {
          deleteMessage(message.id, userId);
        }}
      >
        delete
      </button>
      <button
        onClick={() => {
          spamMessage(message.id, userId);
        }}
      >
        add to spam
      </button>
    </div>
  );
};

export default Message;
