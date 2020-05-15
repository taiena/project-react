import React from "react";
import ReactDOM from "react-dom";
import "./scss/index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

let posts = [
  { id: 1, message: "Hi, how are you?", likesCount: 3 },
  { id: 2, message: "It is so cool!", likesCount: 12 },
  { id: 3, message: "It is my first post", likesCount: 5 },
];

let dialogs = [
  { id: 1, name: "Lena" },
  { id: 2, name: "Vova" },
];

let messages = [
  { id: 1, message: "Hi" },
  { id: 2, message: "Hello" },
];

ReactDOM.render(
  <React.StrictMode>
    <App posts={posts} dialogs={dialogs} messages={messages} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
