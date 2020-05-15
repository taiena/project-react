import React from "react";
import classes from "./messages.module.scss";
import { NavLink } from "react-router-dom";

const Dialog = (props) => {
  let path = "/messages/" + props.id;

  return (
    <div className={classes.dialog + " " + classes.active}>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  );
};

const Message = (props) => {
  return (
    <div className={classes.message}>
      <div>{props.message}</div>
    </div>
  );
};

const Messages = () => {
  let dialogs = [
    { id: 1, name: "Lena" },
    { id: 2, name: "Vova" },
  ];

  let messages = [
    { id: 1, message: "Hi" },
    { id: 2, message: "Hello" },
  ];

  let dialogsElements = dialogs.map((d) => <Dialog name={d.name} id={d.id} />);

  let messagesElements = messages.map((m) => <Message message={m.message} />);

  return (
    <div className={classes.messages}>
      <div className={classes.dialogList}>{dialogsElements}</div>
      <div className={classes.messageList}>{messagesElements}</div>
    </div>
  );
};

export default Messages;

// пример с массивом dialogs, но без map

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
