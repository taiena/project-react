import React, { Component } from "react";
import { setUserProfile } from "../../redux/profileReducer.js";
import { connect } from "react-redux";
import Profile from "./Profile";
import { withRouter } from "react-router-dom";
import { profileAPI } from "../../api/api";

class ProfileContainer extends Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;

    if (!userId) {
      userId = 2;
    }

    profileAPI.getProfile(userId).then((data) => {
      this.props.setUserProfile(data);
    });
  }
  render() {
    return <Profile {...this.props} profile={this.props.profile} />;
  }
}

// когда функция возвращает объект, ставим круглые скобки
let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
});

// компонента закидывает данные из Урла в ProfileContainer
let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, { setUserProfile })(
  WithUrlDataContainerComponent
);
