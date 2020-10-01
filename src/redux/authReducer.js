const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
  userId: null,
  emil: null,
  lodin: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // получить данные пользователя
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data, // сразу все 3 свойства юзера запишутся в стейт
        isAuth: true,
      };

    default:
      return state;
  }
};

// можно вместо (userId, email, login) передать просто data, но так понятней
export const setAuthUserData = (userId, email, login) => ({
  type: SET_USER_DATA,
  userId,
  email,
  login,
});

export default authReducer;
