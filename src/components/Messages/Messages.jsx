import React from "react";
import classes from "./Messages.module.scss";
import Message from "./Message/Message.jsx";
import Dialog from "./Dialog/Dialog.jsx";
import { Field, reduxForm } from "redux-form";
import { required, maxLengthCreator } from "../../utils/validators/validators";
import { Textarea } from "../common/FormsControls/FormsControls";

const maxLength50 = maxLengthCreator(50);

const Messages = (props) => {
  let state = props.messagesPage;

  // в values приходят параметры Field
  let addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody);
  };

  let dialogsElements = state.dialogs.map((d) => (
    <Dialog name={d.name} id={d.id} key={d.id} />
  ));

  let messagesElements = state.messages.map((m) => (
    <Message message={m.message} key={m.id} />
  ));

  return (
    <div className={classes.messages}>
      <div className={classes.dialogList}>{dialogsElements}</div>
      <div className={classes.messageList}>
        {messagesElements}
        <AddMessageReduxForm onSubmit={addNewMessage} />
      </div>
    </div>
  );
};

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          name="newMessageBody"
          placeholder="Enter your message here"
          validate={[required, maxLength50]}
        />
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};

const AddMessageReduxForm = reduxForm({
  form: "message",
})(AddMessageForm);

export default Messages;
