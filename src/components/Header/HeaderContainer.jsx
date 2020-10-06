import React, { Component } from "react";
import { getAuthUserData } from "../../redux/authReducer.js";
import { connect } from "react-redux";
import Header from "./Header.jsx";

class HeaderContainer extends Component {
  componentDidMount() {
    this.props.getAuthUserData();
  }

  render() {
    return <Header {...this.props} />;
  }
}

let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  id: state.auth.id,
  email: state.auth.email,
  login: state.auth.login,
});

export default connect(mapStateToProps, {
  getAuthUserData,
})(HeaderContainer);
