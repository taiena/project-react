import React from "react";
import classes from "./Dialog.module.scss";
import { NavLink } from "react-router-dom";
import { PhotosType } from "../../../../types/types";
import userAva from "../../../../assets/images/ava.svg";
import { formatDate } from "../../../../utils/formatDate";

type PropsType = {
  id: number;
  userName: string;
  hasNewMessages: boolean;
  lastDialogActivityDate: any;
  lastUserActivityDate: any;
  newMessagesCount: number;
  photos: PhotosType;
};

const Dialog: React.FC<PropsType> = ({
  userName,
  id,
  hasNewMessages,
  lastDialogActivityDate,
  lastUserActivityDate,
  newMessagesCount,
  photos,
}) => {
  let path = `dialogs/messages/${id}`;

  let dialogDate = new Date(lastDialogActivityDate);
  let wasOnlineDate = new Date(lastUserActivityDate);

  return (
    <article>
      <NavLink to={path}>
        <div className={classes.Dialog}>
          <div className={classes.Photo}>
            <img src={photos.small != null ? photos.small : userAva} alt="" />
          </div>

          <div className={classes.NameContainer}>
            <div className={classes.UserName}>{userName}</div>
            <div className={classes.NewMessages}>
              {hasNewMessages ? (
                <span>New messages: {newMessagesCount}</span>
              ) : null}
            </div>
          </div>

          <div className={classes.Dates}>
            <div>
              <span>last dialog: </span>
              {formatDate(dialogDate)}
            </div>
            <div>
              <span>was online: </span>
              {formatDate(wasOnlineDate)}
            </div>
          </div>
        </div>
      </NavLink>
    </article>
  );
};

export default Dialog;
