import React, { useEffect, useState, useRef } from "react";
import classes from "./ChatMessages.module.scss";
import { useSelector } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";
import ChatMessage from "./ChatMessage/ChatMessage";

const ChatMessages: React.FC<{}> = () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <section className={classes.Messages} onScroll={scrollHandler}>
      {messages.map((m, index) => (
        <ChatMessage key={index} message={m} />
      ))}
      <div ref={messagesAnchorRef}></div>
    </section>
  );
};

export default ChatMessages;
