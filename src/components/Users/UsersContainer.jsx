import React from "react";
import Users from "./Users.jsx";
import { followAC, unfollowAC, setUsersAC } from "../../redux/usersReducer.js";

import { connect } from "react-redux";

// в компоненту Users придут в пропсах юзеры из стейта
let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
  };
};

// в компоненту Users придут колбэки, которые она сможет вызывать
let mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => {
      dispatch(followAC(userId));
    },
    unfollow: (userId) => {
      dispatch(unfollowAC(userId));
    },
    setUsers: (users) => {
      dispatch(setUsersAC(users));
    },
  };
};

// connect создает контейнерную компоненту,
// внутри нее рендерит презентационную компоненту,
// внутрь которой в качестве пропсов передает свойства,
// которые сидят в mapStateToProps, mapDispatchToProps
// каждый раз при изменениях в стейте запускается mapStateToProps
// и формируется новый объект

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;
