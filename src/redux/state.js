import { rerenderEntireTree } from "../render";

let state = {
  mainPage: {
    posts: [
      { id: 1, message: "Hi, how are you?", likesCount: 3 },
      { id: 2, message: "It is so cool!", likesCount: 12 },
      { id: 3, message: "It is my first post", likesCount: 5 },
    ],
    newPostText: "Enter your post here",
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

window.state = state;

export let addPost = () => {
  let newPost = {
    id: 5,
    message: state.mainPage.newPostText,
    likesCount: 0,
  };

  state.mainPage.posts.push(newPost);
  state.mainPage.newPostText = "";
  rerenderEntireTree(state);
};

export let updateNewPostText = (newText) => {
  state.mainPage.newPostText = newText;
  rerenderEntireTree(state);
};

export default state;
