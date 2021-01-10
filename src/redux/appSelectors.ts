import { AppStateType } from "./redux-store";

export const selectIsGlobalError = (state: AppStateType) => {
  return state.app.globalError;
};

export const selectIsInitialized = (state: AppStateType) => {
  return state.app.initialized;
};
