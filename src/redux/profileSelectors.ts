import { AppStateType } from "./redux-store";

export const selectPosts = (state: AppStateType) => {
  return state.profilePage.posts;
};

export const selectProfile = (state: AppStateType) => {
  return state.profilePage.profile;
};

export const selectStatus = (state: AppStateType) => {
  return state.profilePage.status;
};
