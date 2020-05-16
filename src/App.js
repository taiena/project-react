import React from "react";
import "./scss/App.scss";
import Header from "./components/header/header.jsx";
import Nav from "./components/nav/nav.jsx";
import Main from "./components/main/main.jsx";
import Messages from "./components/messages/messages.jsx";
import Friends from "./components/friends/friends.jsx";
import Photos from "./components/photos/photos.jsx";
import Music from "./components/music/music.jsx";
import { BrowserRouter, Route } from "react-router-dom";

const App = (props) => {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <Nav />
        <div className="wrapper-content">
          <Route
            path="/main"
            render={() => <Main posts={props.appState.posts} />}
          />
          <Route
            path="/messages"
            render={() => (
              <Messages
                messages={props.appState.messages}
                dialogs={props.appState.dialogs}
              />
            )}
          />
          <Route path="/friends" component={Friends} />
          <Route path="/photos" component={Photos} />
          <Route path="/music" component={Music} />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
