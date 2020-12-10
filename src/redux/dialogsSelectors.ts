import { AppStateType } from "./redux-store";

export const selectMessages = (state: AppStateType) => {
  return state.dialogsPage.messages;
};

export const selectDialogs = (state: AppStateType) => {
  return state.dialogsPage.dialogs;
};

export const selectIsLoading = (state: AppStateType) => {
  return state.dialogsPage.isLoading;
};
