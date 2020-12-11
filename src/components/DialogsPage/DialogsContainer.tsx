import React from "react";
import { useSelector } from "react-redux";
import Dialogs from "./Dialogs/Dialogs";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { selectIsLoading } from "../../redux/dialogsSelectors";
import Preloader from "../common/Preloader/Preloader";

type DialogsPagePropsType = {};

const DialogsPage: React.FC<DialogsPagePropsType> = (props) => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <>
      {isLoading ? <Preloader /> : null}
      <Dialogs />
    </>
  );
};

export default compose<React.ComponentType>(withAuthRedirect)(DialogsPage);
