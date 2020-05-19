import { rerenderEntireTree } from "../render";

let state = {
  mainPage: {
    posts: [
      { id: 1, message: "Hi, how are you?", likesCount: 3 },
      { id: 2, message: "It is so cool!", likesCount: 12 },
      { id: 3, message: "It is my first post", likesCount: 5 },
    ],
  },

  messagesPage: {
    dialogs: [
      { id: 1, name: "Lena" },
      { id: 2, name: "Vova" },
    ],

    messages: [
      { id: 1, message: "Hi" },
      { id: 2, message: "Hello" },
    ],
  },
};

export let addPost = (postMessage) => {
  let newPost = {
    id: 5,
    message: postMessage,
    likesCount: 0,
  };

  state.mainPage.posts.push(newPost);
  rerenderEntireTree(state);
};

export default state;
