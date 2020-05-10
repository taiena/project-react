import React from "react";
import "./App.css";
import Header from "./components/header/header";
import Nav from "./components/nav/nav";
import Profile from "./components/profile/profile";

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <Nav />
      <Profile />
    </div>
  );
};

export default App;
