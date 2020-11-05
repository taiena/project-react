import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS";

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };

    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

// можно вместо (userId, email, login) передать просто data, но так понятней
export const setAuthUserData = (id, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { id, email, login, isAuth },
});

export const getCaptchaUrlSuccess = (captchaUrl) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl },
});

//thunk
export const getAuthUserData = () => async (dispatch) => {
  let response = await authAPI.getAuthMe();
  // 0 значит мы залогинены
  if (response.data.resultCode === 0) {
    // забираем id, email, login из data.data
    let { id, email, login } = response.data.data;
    // отправляем их в редьюсер
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login = (email, password, rememberMe, captcha) => async (
  dispatch
) => {
  let response = await authAPI.login(email, password, rememberMe, captcha);
  // 0 значит мы залогинены
  if (response.data.resultCode === 0) {
    dispatch(getAuthUserData());
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }

    let message =
      response.data.messages.length > 0
        ? response.data.messages[0]
        : "Some error";
    dispatch(stopSubmit("login", { _error: message }));
  }
};

export const logout = () => async (dispatch) => {
  let response = await authAPI.logout();
  // 0 значит мы залогинены
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export const getCaptchaUrl = () => async (dispatch) => {
  let response = await securityAPI.getCaptchaUrl();
  let captchaUrl = response.data.url;
  dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export default authReducer;
