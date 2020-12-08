import React from "react";
import { useSelector } from "react-redux";
import MessagesPage from "./MessagesPage";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { selectIsLoading } from "../../redux/messagesSelectors";
import Preloader from "../common/Preloader/Preloader";

type MessagesPagePropsType = {};

const MessagesContainer: React.FC<MessagesPagePropsType> = (props) => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <>
      {isLoading ? <Preloader /> : null}
      <MessagesPage />
    </>
  );
};

export default compose<React.ComponentType>(withAuthRedirect)(
  MessagesContainer
);
