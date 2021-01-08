import React, { Component } from "react";
import classes from "./scss/App.module.scss";
import "./scss/dark.scss";
// import "./scss/light.scss";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import ProfilePage from "./components/Profile/ProfileContainer";
import DialogsPage from "./components/DialogsPage/DialogsContainer";
import MessagesPage from "./components/DialogsPage/Messages/MessagesContainer";
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
const ChatPage = React.lazy(() => import("./components/Chat/ChatPage"));
const SuspendedLogin = withSuspense(Login);
const SuspendedChat = withSuspense(ChatPage);

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

        <Header />
        <Nav />
        <div className={classes.wrapperContent}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to={"/profile"} />} />
            <Route path="/profile/:userId?" render={() => <ProfilePage />} />
            <Route
              path="/dialogs/messages/:id?"
              render={() => <MessagesPage />}
            />
            <Route path="/dialogs" render={() => <DialogsPage />} />
            <Route
              path="/users"
              render={() => <UsersPage pageTitle={"Find users"} />}
            />
            <Route path="/chat" render={SuspendedChat} />
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
