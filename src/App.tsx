import React, { Component } from "react";
import classes from "./scss/App.module.scss";
import HeaderContainer from "./components/Header/HeaderContainer";
import Nav from "./components/Nav/Nav";
import ProfileContainer from "./components/Profile/ProfileContainer";
import MessagesContainer from "./components/Messages/MessagesContainer";
import { UsersPage } from "./components/Users/UsersContainer";
import {
  BrowserRouter,
  Route,
  withRouter,
  Redirect,
  Switch,
} from "react-router-dom";
import {
  initializeApp,
  globalErrorCatch,
  globalErrorNull,
} from "./redux/appReducer";
import { connect } from "react-redux";
import { compose } from "redux";
import Preloader from "./components/common/Preloader/Preloader";
import ErrorModal from "./components/common/ErrorModal/ErrorModal";
import store, { AppStateType } from "./redux/redux-store";
import { Provider } from "react-redux";
import { withSuspense } from "./hoc/withSuspense";

const Login = React.lazy(() => import("./components/Login/LoginPage"));
const SuspendedLogin = withSuspense(Login);

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void;
  globalErrorCatch: (globalError: string | null) => void;
  globalErrorNull: () => void;
};

class App extends Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (promiseRejectionEvent: any) => {
    let globalError = promiseRejectionEvent.reason.message;
    this.props.globalErrorCatch(globalError);
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
            globalErrorNull={this.props.globalErrorNull}
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
            <Route
              path="/users"
              render={() => <UsersPage pageTitle={"Find users"} />}
            />
            <Route path="/login" render={SuspendedLogin} />
            <Route path="*" render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
  globalError: state.app.globalError,
});

//26 min
let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, {
    initializeApp,
    globalErrorCatch,
    globalErrorNull,
  })
)(App);

const MyApp: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default MyApp;
