// import mainReducer from "./mainReducer";
// import messagesReducer from "./messagesReducer";

// let store = {
//   _state: {
//     mainPage: {
//       posts: [
//         { id: 1, message: "Hi, how are you?", likesCount: 3 },
//         { id: 2, message: "It is so cool!", likesCount: 12 },
//         { id: 3, message: "It is my first post", likesCount: 5 },
//       ],
//       newPostText: "Enter your post here",
//     },

//     messagesPage: {
//       dialogs: [
//         { id: 1, name: "Lena" },
//         { id: 2, name: "Vova" },
//       ],

//       messages: [
//         { id: 1, message: "Hi" },
//         { id: 2, message: "Hello" },
//       ],

//       newMessageBody: "",
//     },
//   },

//   _callSubscriber() {
//     console.log("State changed");
//   },

//   getState() {
//     return this._state;
//   },

//   subscribe(observer) {
//     this._callSubscriber = observer;
//   },

//   dispatch(action) {
//     this._state.mainPage = mainReducer(this._state.mainPage, action);
//     this._state.messagesPage = messagesReducer(
//       this._state.messagesPage,
//       action
//     );

//     this._callSubscriber(this._state);
//   },
// };

// export default store;
// window.store = store;
