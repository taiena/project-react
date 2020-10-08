import React, { Component } from "react";
import { getUserProfile } from "../../redux/profileReducer.js";
import { connect } from "react-redux";
import Profile from "./Profile";
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

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

let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

// когда функция возвращает объект, ставим круглые скобки
let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
});

// компонента закидывает данные из Урла в ProfileContainer
let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

export default connect(mapStateToProps, { getUserProfile })(
  WithUrlDataContainerComponent
);
