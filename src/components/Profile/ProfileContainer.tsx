import React, { useEffect } from "react";
import { getUserProfile, getUserStatus } from "../../redux/profileReducer";
import { selectId } from "../../redux/authSelectors";
import Profile from "./Profile";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { useSelector, useDispatch } from "react-redux";

type PathParamsType = {
  userId: string;
};
type ProfilePagePropsType = RouteComponentProps<PathParamsType>;

const ProfilePage: React.FC<ProfilePagePropsType> = (props) => {
  const authorizedUserId = useSelector(selectId);

  const dispatch = useDispatch();

  useEffect(() => {
    let userId: number | null = +props.match.params.userId;
    if (!userId) {
      userId = authorizedUserId;
      if (!userId) {
        props.history.push("/login");
      }
    }
    if (!userId) {
      console.error(
        "ID should exists in URI params or in state ('authorizedUserId')"
      );
    } else {
      dispatch(getUserProfile(userId));
      dispatch(getUserStatus(userId));
    }
  }, []);

  // isOwner true when no id in props (then it is our profile)
  return (
    <>
      <Profile isOwner={!props.match.params.userId} />
    </>
  );
};

export default compose<React.ComponentType>(
  withRouter,
  withAuthRedirect
)(ProfilePage);