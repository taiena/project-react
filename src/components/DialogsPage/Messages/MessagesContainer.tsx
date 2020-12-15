import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Messages from "./Messages";
import { withAuthRedirect } from "../../../hoc/withAuthRedirect";
import { compose } from "redux";
import { selectIsLoading } from "../../../redux/dialogsSelectors";
import Preloader from "../../common/Preloader/Preloader";
import { withRouter, RouteComponentProps } from "react-router-dom";

// import { selectProfile } from "../../../redux/profileSelectors";
// import { getUserProfile } from "../../../redux/profileReducer";

type PathParamsType = {
  id: string;
};

type MessagesPagePropsType = RouteComponentProps<PathParamsType>;

const MessagesPage: React.FC<MessagesPagePropsType> = (props) => {
  const isLoading = useSelector(selectIsLoading);
  let userId: number = +props.match.params.id;

  // const dispatch = useDispatch();

  // const profileId = useSelector(selectProfile);
  // console.log("profile: ", profileId);

  // useEffect(() => {
  //   dispatch(getUserProfile(userId));
  // }, []);

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
