import React, { Component } from "react";
import {
  getUserProfile,
  getUserStatus,
  updateUserStatus,
  saveUserPhoto,
  saveUserProfile,
} from "../../redux/profileReducer.js";
import { connect } from "react-redux";
import Profile from "./Profile";
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends Component {
  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }
    this.props.getUserProfile(userId);
    this.props.getUserStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile
        {...this.props}
        // isOwner true, когда в пропсах не приходит айди (тогда это наша страница)
        isOwner={!this.props.match.params.userId}
        saveUserPhoto={this.props.saveUserPhoto}
        profile={this.props.profile}
        status={this.props.status}
        updateUserStatus={this.props.updateUserStatus}
        saveUserProfile={this.props.saveUserProfile}
      />
    );
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth,
  };
};

// compose закинет ProfileContainer в функцию withAuthRedirect,
// это все оборачивается withRouter
// результат этого направит в функцию connect

export default compose(
  connect(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    saveUserPhoto,
    saveUserProfile,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
