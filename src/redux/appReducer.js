import { getAuthUserData } from "./authReducer.js";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";
const GLOBAL_ERROR_CATCHED = "GLOBAL_ERROR_CATCHED";
const GLOBAL_ERROR_NULLED = "GLOBAL_ERROR_NULLED";

let initialState = {
  initialized: false,
  globalError: null,
};

const appReducer = (state = initialState, action) => {
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

export const initializedSuccess = () => ({
  type: INITIALIZED_SUCCESS,
});

export const globalErrorCatched = (globalError) => ({
  type: GLOBAL_ERROR_CATCHED,
  globalError,
});

//when closing the ErrorModal
export const globalErrorNulled = () => ({
  type: GLOBAL_ERROR_NULLED,
});

//thunk
export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuthUserData());

  Promise.all([promise]).then(() => {
    dispatch(initializedSuccess());
  });
};

export default appReducer;
