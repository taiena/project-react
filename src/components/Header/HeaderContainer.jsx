import React, { Component } from "react";
import * as axios from "axios";
import { setAuthUserData } from "../../redux/authReducer.js";
import { connect } from "react-redux";
import Header from "./Header.jsx";

class HeaderContainer extends Component {
  componentDidMount() {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        withCredentials: true, // авторизованный запрос
      })
      .then((response) => {
        // 0 значит мы залогинены
        if (response.data.resultCode === 0) {
          // забираем id, email, login из data.data
          let { id, email, login } = response.data.data;
          // отправляем их в редьюсер
          this.props.setAuthUserData(id, email, login);
        }
        console.log("data from headerCont: ", response.data);
        console.log("props from headerCont: ", this.props);
      });
  }

  render() {
    return <Header {...this.props} />;
  }
}

let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect(mapStateToProps, {
  setAuthUserData,
})(HeaderContainer);
