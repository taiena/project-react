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
      if (action.type === "ADD-POST") {
        let newPost = {
          id: 5,
          message: this._state.mainPage.newPostText,
          likesCount: 0,
        };

        this._state.mainPage.posts.push(newPost);
        this._state.mainPage.newPostText = "";
        this._callSubscriber(this._state);
      } else if (action.type === "UPDATE-NEW-POST-TEXT") {
        this._state.mainPage.newPostText = action.newText;
        this._callSubscriber(this._state);
      } else if (action.type === "UPDATE-NEW-MESSAGE-BODY") {
        this._state.messagePage.newMessageBody = action.body;
        this._callSubscriber(this._state);
      } else if (action.type === "SEND-MESSAGE") {
        let body = this._state.messagePage.newMessageBody;
        this._state.messagePage.messages.push({ id: 3, message: body });
        this._state.messagePage.newMessageBody = "";
        this._callSubscriber(this._state);
      }
    },
  },
};

export const addPostActionCreator = () => {
  return {
    type: "ADD-POST",
  };
};

export const updateNewPostTextActionCreator = (text) => {
  return { type: "UPDATE-NEW-POST-TEXT", newText: text };
};

export const sendMessageCreator = () => {
  return {
    type: "SEND-MESSAGE",
  };
};

export const updateNewMessageBodyCreator = (text) => {
  return { type: "UPDATE-NEW-MESSAGE-BODY", body: text };
};

export default store;
window.store = store;
