import React from "react";
import classes from "./messages.module.scss";
import Message from "./message/message.jsx";
import Dialog from "./dialog/dialog.jsx";
import {
  updateNewMessageBodyCreator,
  sendMessageCreator,
} from "../../redux/state.js";

const Messages = (props) => {
  let state = props.store.getState().messagesPage;

  let dialogsElements = state.dialogs.map((d) => (
    <Dialog name={d.name} id={d.id} />
  ));

  let messagesElements = state.messages.map((m) => (
    <Message message={m.message} />
  ));

  let newMessageBody = state.newMessageBody;

  let onSendMessageClick = () => {
    props.store.dispatch(sendMessageCreator());
  };

  let onNewMessageChange = (e) => {
    let body = e.target.value;
    props.store.dispatch(updateNewMessageBodyCreator(body));
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

// пример с массивом dialogs, но без map

// let dialogs = [
//   { id: 1, name: "Lena" },
//   { id: 2, name: "Vova" },
// ];

// const Messages = () => {

//   return (
//     <div className={classes.messages}>
//       <div className={classes.dialogList}>
//         <Dialog name={dialogs[0].name} id={dialogs[0].id} />
//         <Dialog name={dialogs[1].name} id={dialogs[1].id} />
//       </div>
//     </div>
//   );
// };
