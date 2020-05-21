const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

const UPDATE_NEW_MESSAGE_BODY = "UPDATE_NEW_MESSAGE_BODY";
const SEND_MESSAGE = "SEND_MESSAGE";

let store = {
  _state: {
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

      newMessageBody: "",
    },

    sidebar: {},
  },

  _callSubscriber() {
    console.log("State changed");
  },

  getState() {
    return this._state;
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    if (action.type === ADD_POST) {
      let newPost = {
        id: 5,
        message: this._state.mainPage.newPostText,
        likesCount: 0,
      };
      this._state.mainPage.posts.push(newPost);
      this._state.mainPage.newPostText = "";
      this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_POST_TEXT) {
      this._state.mainPage.newPostText = action.newText;
      this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
      this._state.messagesPage.newMessageBody = action.body;
      this._callSubscriber(this._state);
    } else if (action.type === SEND_MESSAGE) {
      let body = this._state.messagesPage.newMessageBody;
      this._state.messagesPage.newMessageBody = "";
      this._state.messagesPage.messages.push({ id: 6, message: body });
      this._callSubscriber(this._state);
    }
  },
};

export const addPostActionCreator = () => ({ type: ADD_POST });
export const updateNewPostTextActionCreator = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text,
});

export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const updateNewMessageBodyCreator = (body) => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  body: body,
});

export default store;
window.store = store;
