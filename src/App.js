import React from "react";
import "./scss/App.scss";
import Header from "./components/header/header.jsx";
import Nav from "./components/nav/nav.jsx";
import Main from "./components/main/main.jsx";

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <Nav />
      <Main />
    </div>
  );
};

export default App;
