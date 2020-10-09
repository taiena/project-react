import React, { Component } from "react";
import { getUserProfile } from "../../redux/profileReducer.js";
import { connect } from "react-redux";
import Profile from "./Profile";
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;

    if (!userId) {
      userId = 2;
    }
    this.props.getUserProfile(userId);
  }
  render() {
    return <Profile {...this.props} profile={this.props.profile} />;
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
});

// compose закинет ProfileContainer в функцию withAuthRedirect,
// это все оборачивается withRouter
// результат этого направит в функцию connect

export default compose(
  connect(mapStateToProps, { getUserProfile }),
  withRouter
  // withAuthRedirect
)(ProfileContainer);
