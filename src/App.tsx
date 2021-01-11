import React, { useEffect, useState } from "react";
import classes from "./scss/App.module.scss";
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
import { initializeApp, globalErrorCatch } from "./redux/appReducer";
import { compose } from "redux";
import Preloader from "./components/common/Preloader/Preloader";
import ErrorModal from "./components/common/ErrorModal/ErrorModal";
import store, { AppStateType } from "./redux/redux-store";
import { Provider } from "react-redux";
import { withSuspense } from "./hoc/withSuspense";
import { selectIsGlobalError, selectIsInitialized } from "./redux/appSelectors";
import { useSelector, useDispatch } from "react-redux";

const Login = React.lazy(() => import("./components/Login/LoginPage"));
const ChatPage = React.lazy(() => import("./components/Chat/ChatPage"));
const SuspendedLogin = withSuspense(Login);
const SuspendedChat = withSuspense(ChatPage);

type PropsType = {};

const App: React.FC<PropsType> = (props) => {
  // function return true if darkMode
  const getInitialMode = () => {
    const item = localStorage.getItem("dark");
    const savedMode = JSON.parse(`${item}`);
    return savedMode || false;
  };

  const [darkMode, setDarkMode] = useState(getInitialMode());

  const changeTheme = () => {
    setDarkMode((prevMode: boolean) => !prevMode);
  };

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
  }, []);

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(darkMode));
  }, [darkMode]);

  if (!initialized) {
    return <Preloader />;
  }

  return (
    // <div className={classes.darkMode}>
    <div className={darkMode ? classes.darkMode : classes.lightMode}>
      <div className={classes.wrapper}>
        {globalError !== null && <ErrorModal globalError={globalError} />}

        <Header changeTheme={changeTheme} />
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
    </div>
  );
};

let AppContainer = compose<React.ComponentType>(withRouter)(App);

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
