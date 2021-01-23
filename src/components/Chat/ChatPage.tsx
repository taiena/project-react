import React, { useEffect, useState, useRef } from "react";
import classes from "./ChatPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  startMessagesListening,
  stopMessagesListening,
  sendMessage,
} from "../../redux/chatReducer";
import { ChatMessageAPIType } from "../../api/chatApi";
import { AppStateType } from "../../redux/redux-store";

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: React.FC = () => {
  const dispatch = useDispatch();

  const status = useSelector((state: AppStateType) => state.chat.status);

  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);

  return (
    <div>
      {status === "error" && (
        <div>Some error occured. Please refresh the page</div>
      )}
      <>
        <Messages />
        <AddMessageForm />
      </>
    </div>
  );
};

const Messages: React.FC<{}> = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);
  const messagesAnchorRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;
    if (
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight
      ) < 300
    ) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <section className={classes.messages} onScroll={scrollHandler}>
      {messages.map((m, index) => (
        <Message key={index} message={m} />
      ))}
      <div ref={messagesAnchorRef}></div>
    </section>
  );
};

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(
  ({ message }) => {
    return (
      <div>
        <img src={message.photo} alt={message.userName} />
        <div>{message.userName}</div>
        <div>{message.message}</div>
        <hr />
      </div>
    );
  }
);

const AddMessageForm: React.FC<{}> = () => {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const status = useSelector((state: AppStateType) => state.chat.status);

  const sendMessageHandler = () => {
    if (!message) {
      return;
    }
    dispatch(sendMessage(message));
    setMessage("");
  };

  return (
    <div>
      <textarea
        onChange={(e) => setMessage(e.currentTarget.value)}
        value={message}
      ></textarea>
      <button disabled={status !== "ready"} onClick={sendMessageHandler}>
        Send
      </button>
    </div>
  );
};

export default ChatPage;
