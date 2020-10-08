import React from "react";
import classes from "./Messages.module.scss";
import Message from "./Message/Message.jsx";
import Dialog from "./Dialog/Dialog.jsx";

const Messages = (props) => {
  let state = props.messagesPage;

  let dialogsElements = state.dialogs.map((d) => (
    <Dialog name={d.name} id={d.id} key={d.id} />
  ));

  let messagesElements = state.messages.map((m) => (
    <Message message={m.message} key={m.id} />
  ));

  let newMessageBody = state.newMessageBody;

  let onSendMessageClick = () => {
    props.sendMessage();
  };

  let onNewMessageChange = (e) => {
    let body = e.target.value;
    props.updateNewMessageBody(body);
  };

  return (
    <div className={classes.messages}>
      <div className={classes.dialogList}>{dialogsElements}</div>
      <div className={classes.messageList}>
        <div>{messagesElements}</div>
        <div>
          <div>
            <textarea
              value={newMessageBody}
              onChange={onNewMessageChange}
              placeholder="Enter your message here"
            ></textarea>
          </div>
          <div>
            <button onClick={onSendMessageClick}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
