import { combineReducers, createStore } from "redux";
import mainReducer from "./mainReducer";
import messagesReducer from "./messagesReducer";

let reducers = combineReducers({
  mainPage: mainReducer,
  messagesPage: messagesReducer,
});

let store = createStore(reducers);

export default store;
