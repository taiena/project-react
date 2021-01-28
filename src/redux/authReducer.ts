import { ResultCodeForCapcthaEnum, ResultCodesEnum } from "../api/api";
import { authAPI } from "../api/authApi";
import { securityAPI } from "../api/securityApi";
import { stopSubmit, FormAction } from "redux-form";
import { BaseThunkType, InferActionsTypes } from "./redux-store";
import { profileAPI } from "../api/profileApi";

let initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false as boolean,
  captchaUrl: null as string | null,
  ownerPhoto: null as string | null,
};

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
// FormAction need to stopSubmit
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;

const authReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        ...action.payload,
      };

    case "GET_CAPTCHA_URL_SUCCESS":
      return {
        ...state,
        ...action.payload,
      };

    case "SET_OWNER_PHOTO":
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const actions = {
  setAuthUserData: (
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: "SET_USER_DATA",
      payload: { id, email, login, isAuth },
    } as const),

  getCaptchaUrlSuccess: (captchaUrl: string) =>
    ({
      type: "GET_CAPTCHA_URL_SUCCESS",
      payload: { captchaUrl },
    } as const),

  setOwnerPhoto: (ownerPhoto: string | null) =>
    ({
      type: "SET_OWNER_PHOTO",
      payload: { ownerPhoto },
    } as const),
};

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let meData = await authAPI.getAuthMe();
  if (meData.resultCode === ResultCodesEnum.Success) {
    let { id, email, login } = meData.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
};

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
): ThunkType => async (dispatch) => {
  let loginData = await authAPI.login(email, password, rememberMe, captcha);
  if (loginData.resultCode === ResultCodesEnum.Success) {
    dispatch(getAuthUserData());
  } else {
    if (loginData.resultCode === ResultCodeForCapcthaEnum.CaptchaIsRequired) {
      dispatch(getCaptchaUrl());
    }
    let message =
      loginData.messages.length > 0 ? loginData.messages[0] : "Some error";
    dispatch(stopSubmit("login", { _error: message }));
  }
};

export const logout = (): ThunkType => async (dispatch) => {
  let logoutData = await authAPI.logout();
  if (logoutData.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  let data = await securityAPI.getCaptchaUrl();
  let captchaUrl = data.url;
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export const getOwnerPhoto = (id: number): ThunkType => async (dispatch) => {
  let data = await profileAPI.getProfile(id);
  let photo = data.photos.small;
  dispatch(actions.setOwnerPhoto(photo));
};

export default authReducer;
