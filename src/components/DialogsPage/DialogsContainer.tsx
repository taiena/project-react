import React from "react";
import { useSelector } from "react-redux";
import DialogsPage from "./DialogsPage";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { selectIsLoading } from "../../redux/dialogsSelectors";
import Preloader from "../common/Preloader/Preloader";

type DialogsPagePropsType = {};

const MessagesContainer: React.FC<DialogsPagePropsType> = (props) => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <>
      {isLoading ? <Preloader /> : null}
      <DialogsPage />
    </>
  );
};

export default compose<React.ComponentType>(withAuthRedirect)(
  MessagesContainer
);
