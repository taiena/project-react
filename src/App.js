import React from "react";
import "./scss/App.scss";
import Header from "./components/header/header.jsx";
import Nav from "./components/nav/nav.jsx";
import Profile from "./components/Profile/Profile.jsx";
import MessagesContainer from "./components/messages/messagesContainer.jsx";
import UsersContainer from "./components/Users/UsersContainer.jsx";
import Photos from "./components/photos/photos.jsx";
import Music from "./components/music/music.jsx";
import { Route } from "react-router-dom";

const App = (props) => {
  return (
    <div className="wrapper">
      <Header />
      <Nav />
      <div className="wrapper-content">
        <Route path="/profile" render={() => <Profile />} />
        <Route path="/messages" render={() => <MessagesContainer />} />
        <Route path="/users" render={() => <UsersContainer />} />
        <Route path="/photos" component={Photos} />
        <Route path="/music" component={Music} />
      </div>
    </div>
  );
};

export default App;
