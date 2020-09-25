import React from "react";
import "./scss/App.scss";
import Header from "./components/Header/Header.jsx";
import Nav from "./components/Nav/Nav.jsx";
import ProfileContainer from "./components/Profile/ProfileContainer.jsx";
import MessagesContainer from "./components/Messages/MessagesContainer.jsx";
import UsersContainer from "./components/Users/UsersContainer.jsx";

import { Route } from "react-router-dom";

const App = (props) => {
  return (
    <div className="wrapper">
      <Header />
      <Nav />
      <div className="wrapper-content">
        <Route path="/profile" render={() => <ProfileContainer />} />
        <Route path="/messages" render={() => <MessagesContainer />} />
        <Route path="/users" render={() => <UsersContainer />} />
      </div>
    </div>
  );
};

export default App;
