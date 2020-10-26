import React, { Component } from "react";
import classes from "./scss/App.module.scss";
import HeaderContainer from "./components/Header/HeaderContainer.jsx";
import Nav from "./components/Nav/Nav.jsx";
import ProfileContainer from "./components/Profile/ProfileContainer.jsx";
import MessagesContainer from "./components/Messages/MessagesContainer.jsx";
import UsersContainer from "./components/Users/UsersContainer.jsx";
import Login from "./components/Login/Login.jsx";
import { Route, withRouter } from "react-router-dom";
import { initializeApp } from "./redux/appReducer.js";
import { connect } from "react-redux";
import { compose } from "redux";
import Preloader from "./components/common/Preloader/Preloader";

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <div className={classes.wrapper}>
        <HeaderContainer />
        <Nav />
        <div className={classes.wrapperContent}>
          <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
          <Route path="/messages" render={() => <MessagesContainer />} />
          <Route path="/users" render={() => <UsersContainer />} />
          <Route path="/login" render={() => <Login />} />
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);
