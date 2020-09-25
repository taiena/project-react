import React, { Component } from "react";
import * as axios from "axios";
import { setUserProfile } from "../../redux/profileReducer.js";
import { connect } from "react-redux";
import Profile from "./Profile";

class ProfileContainer extends Component {
  componentDidMount() {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
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

export default connect(mapStateToProps, { setUserProfile })(ProfileContainer);
