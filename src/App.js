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
import {
  initializeApp,
  globalErrorCatched,
  globalErrorNulled,
} from "./redux/appReducer.js";
import { connect } from "react-redux";
import { compose } from "redux";
import Preloader from "./components/common/Preloader/Preloader";
import ErrorModal from "./components/common/ErrorModal/ErrorModal";
import store from "./redux/redux-store.js";
import { Provider } from "react-redux";
import { withSuspense } from "./hoc/withSuspense";
const Login = React.lazy(() => import("./components/Login/Login"));

class App extends Component {
  catchAllUnhandledErrors = (promiseRejectionEvent) => {
    let globalError = promiseRejectionEvent.reason.message;
    this.props.globalErrorCatched(globalError);
  };

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandledErrors
    );
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <div className={classes.wrapper}>
        {this.props.globalError !== null && (
          <ErrorModal
            globalError={this.props.globalError}
            globalErrorNull={this.props.globalErrorNulled}
          />
        )}

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
  globalError: state.app.globalError,
});

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, {
    initializeApp,
    globalErrorCatched,
    globalErrorNulled,
  })
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
