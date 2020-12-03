import React, { Component } from "react";
import { getUserProfile, getUserStatus } from "../../redux/profileReducer";
import { selectIsAuth, selectId } from "../../redux/authSelectors";
import { connect } from "react-redux";
import Profile from "./Profile";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = ReturnType<typeof mapStateToProps>;

type MapDispatchPropsType = {
  getUserProfile: (userId: number) => void;
  getUserStatus: (userId: number) => void;
};

type PathParamsType = {
  userId: string;
};
type PropsType = MapStatePropsType &
  MapDispatchPropsType &
  RouteComponentProps<PathParamsType>;

class ProfileContainer extends Component<PropsType> {
  refreshProfile() {
    let userId: number | null = +this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }
    if (!userId) {
      console.error(
        "ID should exists in URI params or in state ('authorizedUserId')"
      );
    } else {
      this.props.getUserProfile(userId);
      this.props.getUserStatus(userId);
    }
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile
        {...this.props}
        // isOwner true when no id in props (then it is our profile)
        isOwner={!this.props.match.params.userId}
      />
    );
  }
}

let mapStateToProps = (state: AppStateType) => {
  return {
    authorizedUserId: selectId(state),
    isAuth: selectIsAuth(state),
  };
};

// compose will place ProfileContainer to function withAuthRedirect,
// all this will wrap with withRouter
// and result of this will send to function connect

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    getUserProfile,
    getUserStatus,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
