import React, { useEffect, useState } from "react";
import classes from "./ChatPage.module.scss";

const wsChannel = new WebSocket(
  "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
);

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: React.FC = () => {
  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  );
};

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);

  useEffect(() => {
    wsChannel.addEventListener("message", (e: MessageEvent) => {
      let newMessages = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    });
  }, []);

  return (
    <div className={classes.messages}>
      {messages.map((m, index) => (
        <Message key={index} message={m} />
      ))}
    </div>
  );
};

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
  return (
    <div>
      <img src={message.photo} />
      <div>{message.userName}</div>
      <div>{message.message}</div>
      <hr />
    </div>
  );
};

const AddMessageForm: React.FC = () => {
  return (
    <div>
      <textarea></textarea>
      <button>Send</button>
    </div>
  );
};

export default ChatPage;
