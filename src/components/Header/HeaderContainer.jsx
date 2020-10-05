import React, { Component } from "react";
import { setAuthUserData } from "../../redux/authReducer.js";
import { connect } from "react-redux";
import Header from "./Header.jsx";
import { authAPI } from "../../api/api";

class HeaderContainer extends Component {
  componentDidMount() {
    authAPI.getAuth().then((data) => {
      // 0 значит мы залогинены
      if (data.resultCode === 0) {
        // забираем id, email, login из data.data
        let { id, email, login } = data.data;
        // отправляем их в редьюсер
        this.props.setAuthUserData(id, email, login);
      }
      console.log("data from headerCont: ", data);
      console.log("props from headerCont: ", this.props);
    });
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
  setAuthUserData,
})(HeaderContainer);
