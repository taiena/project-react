import { getAuthUserData } from "./authReducer";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

let initialState = {
  initialized: false,
  globalError: null as string | null,
};

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;

const appReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "INITIALIZED_SUCCESS":
      return {
        ...state,
        initialized: true,
      };

    case "GLOBAL_ERROR_CATCHED":
      return {
        ...state,
        globalError: action.globalError,
      };

    case "GLOBAL_ERROR_NULLED":
      return {
        ...state,
        globalError: null,
      };

    default:
      return state;
  }
};

export const actions = {
  initializedSuccess: () =>
    ({
      type: "INITIALIZED_SUCCESS",
    } as const),

  globalErrorCatched: (globalError: string | null) =>
    ({
      type: "GLOBAL_ERROR_CATCHED",
      globalError,
    } as const),

  globalErrorNulled: () =>
    ({
      type: "GLOBAL_ERROR_NULLED",
    } as const),
};

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData());

  Promise.all([promise]).then(() => {
    dispatch(actions.initializedSuccess());
  });
};

// when error is catched
export const globalErrorCatch = (
  globalError: string | null
): ThunkType => async (dispatch) => {
  dispatch(actions.globalErrorCatched(globalError));
};

//when closing the ErrorModal
export const globalErrorNull = (): ThunkType => async (dispatch) => {
  dispatch(actions.globalErrorNulled());
};

export default appReducer;
