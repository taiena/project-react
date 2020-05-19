import React from "react";
import ReactDOM from "react-dom";
import "./scss/index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import state from "./redux/state.js";
import { addPost } from "./redux/state.js";

export let rerenderEntireTree = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App state={state} addPost={addPost} />
    </React.StrictMode>,
    document.getElementById("root")
  );
};
