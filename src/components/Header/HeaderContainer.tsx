import React, { Component } from "react";
import { logout } from "../../redux/authReducer";
import { connect } from "react-redux";
import Header, { MapPropsType, DispatchPropsType } from "./Header";
import { AppStateType } from "../../redux/redux-store";

class HeaderContainer extends Component<MapPropsType & DispatchPropsType> {
  render() {
    return <Header {...this.props} />;
  }
}

let mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
};

export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(
  mapStateToProps,
  { logout }
)(HeaderContainer);
