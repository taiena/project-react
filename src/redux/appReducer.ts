import { getAuthUserData } from "./authReducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";
const GLOBAL_ERROR_CATCHED = "GLOBAL_ERROR_CATCHED";
const GLOBAL_ERROR_NULLED = "GLOBAL_ERROR_NULLED";

export type InitialStateType = {
  initialized: boolean;
  globalError: string | null;
};

let initialState: InitialStateType = {
  initialized: false,
  globalError: null,
};

const appReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };

    case GLOBAL_ERROR_CATCHED:
      return {
        ...state,
        globalError: action.globalError,
      };

    case GLOBAL_ERROR_NULLED:
      return {
        ...state,
        globalError: null,
      };

    default:
      return state;
  }
};

type InitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS;
};

export const initializedSuccess = (): InitializedSuccessActionType => ({
  type: INITIALIZED_SUCCESS,
});

//when error is catched
type GlobalErrorCatchedActionType = {
  type: typeof GLOBAL_ERROR_CATCHED;
  globalError: string | null;
};

export const globalErrorCatched = (
  globalError: string | null
): GlobalErrorCatchedActionType => ({
  type: GLOBAL_ERROR_CATCHED,
  globalError,
});

//when closing the ErrorModal
type GlobalErrorNulledActionType = {
  type: typeof GLOBAL_ERROR_NULLED;
};

export const globalErrorNulled = (): GlobalErrorNulledActionType => ({
  type: GLOBAL_ERROR_NULLED,
});

//thunk initialized
export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData());

  Promise.all([promise]).then(() => {
    dispatch(initializedSuccess());
  });
};

export default appReducer;
