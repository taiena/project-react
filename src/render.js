import React from "react";
import ReactDOM from "react-dom";
import "./scss/index.scss";
import App from "./App";
import state from "./redux/state.js";
import { addPost, updateNewPostText } from "./redux/state.js";

export let rerenderEntireTree = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App
        state={state}
        addPost={addPost}
        updateNewPostText={updateNewPostText}
      />
    </React.StrictMode>,
    document.getElementById("root")
  );
};
