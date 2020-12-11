import React from "react";
import { useSelector } from "react-redux";
import Messages from "./Messages";
import { withAuthRedirect } from "../../../hoc/withAuthRedirect";
import { compose } from "redux";
import { selectIsLoading } from "../../../redux/dialogsSelectors";
import Preloader from "../../common/Preloader/Preloader";

type MessagesPagePropsType = {};

const MessagesPage: React.FC<MessagesPagePropsType> = (props) => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <>
      {isLoading ? <Preloader /> : null}
      <Messages />
    </>
  );
};

export default compose<React.ComponentType>(withAuthRedirect)(MessagesPage);
