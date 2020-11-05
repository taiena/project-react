import React, { Component } from "react";
import classes from "./scss/App.module.scss";
import HeaderContainer from "./components/Header/HeaderContainer.jsx";
import Nav from "./components/Nav/Nav.jsx";
import ProfileContainer from "./components/Profile/ProfileContainer.jsx";
import MessagesContainer from "./components/Messages/MessagesContainer.jsx";
import UsersContainer from "./components/Users/UsersContainer.jsx";
import {
  BrowserRouter,
  Route,
  withRouter,
  Redirect,
  Switch,
} from "react-router-dom";
import { initializeApp } from "./redux/appReducer.js";
import { connect } from "react-redux";
import { compose } from "redux";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store.js";
import { Provider } from "react-redux";
import { withSuspense } from "./hoc/withSuspense";
const Login = React.lazy(() => import("./components/Login/Login"));

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
          <Switch>
            <Route exact path="/" render={() => <Redirect to={"/profile"} />} />
            <Route
              path="/profile/:userId?"
              render={() => <ProfileContainer />}
            />
            <Route path="/messages" render={() => <MessagesContainer />} />
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/login" render={withSuspense(Login)} />
            <Route path="*" render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

const MyApp = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default MyApp;
