import { AppStateType } from "./redux-store";

export const selectMessages = (state: AppStateType) => {
  return state.messagesPage.messages;
};

export const selectDialogs = (state: AppStateType) => {
  return state.messagesPage.dialogs;
};
