import { authAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // получить данные пользователя
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload, // сразу все 3 свойства юзера запишутся в стейт
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

//thunk
export const getAuthUserData = () => (dispatch) => {
  authAPI.getAuthMe().then((response) => {
    // 0 значит мы залогинены
    if (response.data.resultCode === 0) {
      // забираем id, email, login из data.data
      let { id, email, login } = response.data.data;
      // отправляем их в редьюсер
      dispatch(setAuthUserData(id, email, login, true));
    }
  });
};

export const login = (email, password, rememberMe) => (dispatch) => {
  authAPI.login(email, password, rememberMe).then((response) => {
    // 0 значит мы залогинены
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserData());
    }
  });
};

export const logout = () => (dispatch) => {
  authAPI.logout().then((response) => {
    // 0 значит мы залогинены
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  });
};

export default authReducer;
