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
        //...action.data, // сразу все 3 свойства юзера запишутся в стейт
        isAuth: true,
        login: action.login,
        email: action.email,
        id: action.id,
      };

    default:
      return state;
  }
};

// можно вместо (userId, email, login) передать просто data, но так понятней
export const setAuthUserData = (id, email, login) => ({
  type: SET_USER_DATA,
  id,
  email,
  login,
});

//thunk
export const getAuthUserData = () => {
  return (dispatch) => {
    authAPI.getAuthMe().then((response) => {
      // 0 значит мы залогинены
      if (response.data.resultCode === 0) {
        // забираем id, email, login из data.data
        let { id, email, login } = response.data.data;
        // отправляем их в редьюсер
        dispatch(setAuthUserData(id, email, login));
      }
    });
  };
};

export default authReducer;
