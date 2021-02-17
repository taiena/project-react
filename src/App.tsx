import React, { useEffect } from "react";
import classes from "./scss/App.module.scss";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import NavFloat from "./components/Nav/NavFloat";
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
import { initializeApp, globalErrorCatch } from "./redux/appReducer";
import { compose } from "redux";
import Preloader from "./components/common/Preloader/Preloader";
import ErrorModal from "./components/common/ErrorModal/ErrorModal";
import store from "./redux/redux-store";
import { Provider } from "react-redux";
import { withSuspense } from "./hoc/withSuspense";
import { selectIsGlobalError, selectIsInitialized } from "./redux/appSelectors";
import { useSelector, useDispatch } from "react-redux";
import changeThemes from "./hoc/changeThemes/changeThemes";

const Login = React.lazy(() => import("./components/Login/LoginPage"));
const ChatPage = React.lazy(() => import("./components/Chat/ChatPage"));
const SuspendedLogin = withSuspense(Login);
const SuspendedChat = withSuspense(ChatPage);

type PropsType = { changeTheme: () => void };

const App: React.FC<PropsType> = (props) => {
  const globalError = useSelector(selectIsGlobalError);
  const initialized = useSelector(selectIsInitialized);

  const dispatch = useDispatch();

  const catchAllUnhandledErrors = (promiseRejectionEvent: any) => {
    let globalError = promiseRejectionEvent.reason.message;
    dispatch(globalErrorCatch(globalError));
  };

  useEffect(() => {
    dispatch(initializeApp());
    window.addEventListener("unhandledrejection", catchAllUnhandledErrors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!initialized) {
    return <Preloader />;
  }

  return (
    <div className={classes.Wrapper}>
      {globalError !== null && <ErrorModal globalError={globalError} />}
      <Header changeTheme={props.changeTheme} />
      <Nav />
      <NavFloat />
      <div className={classes.MainContainer}>
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
};

let AppWithChangeThemes = changeThemes(App);
let AppContainer = compose<React.ComponentType>(withRouter)(
  AppWithChangeThemes
);

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
