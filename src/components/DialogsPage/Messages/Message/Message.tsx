import React from "react";
import classes from "./Message.module.scss";
import { MessageType } from "../../../../types/types";

type PropsType = {
  message: MessageType;
  deleteMessage: (messageId: number) => void;
};

const Message: React.FC<PropsType> = ({ message, deleteMessage }) => {
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
          deleteMessage(message.id);
        }}
      >
        delete
      </button>
    </div>
  );
};

export default Message;
