import React from "react";
import classes from "./messages.module.scss";
import Message from "./message/message.jsx";
import Dialog from "./dialog/dialog.jsx";

const Messages = (props) => {
  let dialogsElements = props.state.dialogs.map((d) => (
    <Dialog name={d.name} id={d.id} />
  ));

  let messagesElements = props.state.messages.map((m) => (
    <Message message={m.message} />
  ));

  return (
    <div className={classes.messages}>
      <div className={classes.dialogList}>{dialogsElements}</div>
      <div className={classes.messageList}>{messagesElements}</div>
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
