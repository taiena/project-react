import React from "react";
import { useSelector } from "react-redux";
import Messages from "./Messages";
import { withAuthRedirect } from "../../../hoc/withAuthRedirect";
import { compose } from "redux";
import { selectIsLoading } from "../../../redux/dialogsSelectors";
import Preloader from "../../common/Preloader/Preloader";
import { withRouter, RouteComponentProps } from "react-router-dom";

type PathParamsType = {
  id: string;
};

type MessagesPagePropsType = RouteComponentProps<PathParamsType>;

const MessagesPage: React.FC<MessagesPagePropsType> = (props) => {
  const isLoading = useSelector(selectIsLoading);
  let userId: number = +props.match.params.id;

  return (
    <>
      {isLoading ? <Preloader /> : null}
      <Messages userId={userId} />
    </>
  );
};

export default compose<React.ComponentType>(
  withRouter,
  withAuthRedirect
)(MessagesPage);
