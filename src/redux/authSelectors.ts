import { AppStateType } from "./redux-store";

export const selectIsAuth = (state: AppStateType) => {
  return state.auth.isAuth;
};

export const selectLogin = (state: AppStateType) => {
  return state.auth.login;
};

export const selectId = (state: AppStateType) => {
  return state.auth.id;
};
