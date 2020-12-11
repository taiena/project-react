import React, { useEffect } from "react";
import classes from "./Messages.module.scss";
import Message from "./Message/Message";
import { selectMessages } from "../../../redux/dialogsSelectors";
import { useSelector } from "react-redux";
import AddMessageForm from "./AddMessageForm/AddMessageForm";
import { useDispatch } from "react-redux";
import { actions, getMessages } from "../../../redux/dialogsReducer";
import { compose } from "redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withAuthRedirect } from "../../../hoc/withAuthRedirect";

type PathParamsType = {
  id: string;
};

type MessagesPagePropsType = RouteComponentProps<PathParamsType>;

export type NewMessageFormValuesType = {
  newMessageBody: string;
};

const Messages: React.FC<MessagesPagePropsType> = (props) => {
  const messages = useSelector(selectMessages);
  let userId: number = +props.match.params.id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMessages(userId));
  }, []);

  let addNewMessage = (userId: number, values: NewMessageFormValuesType) => {
    dispatch(actions.sendMessage(userId, values.newMessageBody));
  };

  return (
    <div className={classes.Messages}>
      <h3>Messages with user: {userId}</h3>
      <div>
        {messages.map((m: any) => (
          <Message message={m.message} key={m.id} />
        ))}
      </div>
      {/* <AddMessageForm onSubmit={addNewMessage} /> */}
    </div>
  );
};

export default compose<React.ComponentType>(
  withRouter,
  withAuthRedirect
)(Messages);
