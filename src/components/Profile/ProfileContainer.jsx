import React, { Component } from "react";
import * as axios from "axios";
import { setUserProfile } from "../../redux/profileReducer.js";
import { connect } from "react-redux";
import Profile from "./Profile";
import { withRouter } from "react-router-dom";

class ProfileContainer extends Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 2;
    }
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
      // после получения api приходит response, в нем сидит data
      .then((response) => {
        this.props.setUserProfile(response.data);
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
