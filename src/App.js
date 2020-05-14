import React from "react";
import "./scss/App.scss";
import Header from "./components/header/header.jsx";
import Nav from "./components/nav/nav.jsx";
import Main from "./components/main/main.jsx";
import Messages from "./components/messages/messages.jsx";
import { BrowserRouter, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <Nav />
        <div className="wrapper-content">
          <Route path="/main" component={Main} />
          <Route path="/messages" component={Messages} />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
