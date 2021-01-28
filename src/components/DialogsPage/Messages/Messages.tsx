import React, { useEffect } from "react";
import classes from "./Messages.module.scss";
import Message from "./Message/Message";
import { selectMessages } from "../../../redux/dialogsSelectors";
import { useSelector, useDispatch } from "react-redux";
import AddMessageForm, {
  NewMessageFormValuesType,
} from "../../common/AddMessageForm/AddMessageForm";
import {
  getMessages,
  sendMessage,
  deleteMessage,
  spamMessage,
  getUserPhoto,
} from "../../../redux/dialogsReducer";
import { getOwnerPhoto } from "../../../redux/authReducer";
import { selectPhoto, selectId } from "../../../redux/authSelectors";
import { selectUserPhoto } from "../../../redux/dialogsSelectors";

type PropsType = {
  userId: number;
};

const Messages: React.FC<PropsType> = ({ userId }) => {
  const messages = useSelector(selectMessages);
  const ownerId = useSelector(selectId);
  const ownerPhoto = useSelector(selectPhoto);
  const userPhoto = useSelector(selectUserPhoto);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMessages(userId));
  }, []);

  const getOwnerDialogPhoto = () => {
    let ownerDialogId: number | null = ownerId;
    if (!ownerDialogId) {
      console.log("no owner id in messages");
    } else {
      dispatch(getOwnerPhoto(ownerDialogId));
    }
  };

  const getUserDialogPhoto = () => {
    let userDialogId: number | null = userId;
    if (!userDialogId) {
      console.log("no sender id in messages");
    } else {
      dispatch(getUserPhoto(userDialogId));
    }
  };

  useEffect(() => {
    getOwnerDialogPhoto();
    getUserDialogPhoto();
  }, [ownerId, userId]);

  console.log("owner id: ", ownerId);
  console.log("owner photo: ", ownerPhoto);
  console.log("user id: ", userId);
  console.log("user photo: ", userPhoto);

  let addNewMessage = (values: NewMessageFormValuesType) => {
    let id = userId;
    dispatch(sendMessage(id, values.body));
  };

  const deleteUserMessage = (messageId: number, userId: number) => {
    dispatch(deleteMessage(messageId, userId));
  };

  const addTospamUserMessage = (messageId: number, userId: number) => {
    dispatch(spamMessage(messageId, userId));
  };

  return (
    <div className={classes.MessagesPage}>
      <div className={classes.Messages}>
        {messages.map((message: any) => (
          <Message
            userId={userId}
            key={message.id}
            message={message}
            ownerId={ownerId}
            ownerPhoto={ownerPhoto}
            userPhoto={userPhoto}
            deleteMessage={deleteUserMessage}
            spamMessage={addTospamUserMessage}
          />
        ))}
      </div>
      <AddMessageForm
        onSubmit={addNewMessage}
        text={"send message"}
        placeholder={"Enter message here"}
      />
    </div>
  );
};

export default Messages;
