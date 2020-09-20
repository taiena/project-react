import { combineReducers, createStore } from "redux";
import mainReducer from "./mainReducer";
import messagesReducer from "./messagesReducer";
import usersReducer from "./usersReducer";

let reducers = combineReducers({
  mainPage: mainReducer,
  messagesPage: messagesReducer,
  usersPage: usersReducer,
});

let store = createStore(reducers);

window.store = store;

export default store;
