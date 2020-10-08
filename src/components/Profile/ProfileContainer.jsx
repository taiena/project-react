import React, { Component } from "react";
import { getUserProfile } from "../../redux/profileReducer.js";
import { connect } from "react-redux";
import Profile from "./Profile";
import { Redirect, withRouter } from "react-router-dom";

class ProfileContainer extends Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;

    if (!userId) {
      userId = 2;
    }
    this.props.getUserProfile(userId);
  }
  render() {
    if (!this.props.isAuth) return <Redirect to={"./login"} />;

    return <Profile {...this.props} profile={this.props.profile} />;
  }
}

// когда функция возвращает объект, ставим круглые скобки
let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  isAuth: state.auth.isAuth,
});

// компонента закидывает данные из Урла в ProfileContainer
let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, { getUserProfile })(
  WithUrlDataContainerComponent
);
