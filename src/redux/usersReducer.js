const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 2,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    // зафрендить
    case FOLLOW:
      return {
        ...state, // возвращаем поверхностную копию стейта
        // проходим циклом по массиву юзерс и если находим нужный айди,
        // делаем копию юзера и меняем ему followed
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: true };
          }
          return user;
        }),
      };

    // отфрендить, аналогично follow
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: false };
          }
          return user;
        }),
      };

    // добавить пользователей в стейт (приходят из бекенда)
    case SET_USERS:
      return {
        ...state,
        // к массиву старых юзеров из стейта добавим новых юзеров, к-е пришли
        users: [...action.users],
      };

    // переключить страницу
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };

    // добавить в стейт кол-во пользователей
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.count,
      };

    default:
      return state;
  }
};

// в actionCreator кроме типа придет еще и айди юзера
export const followAC = (userId) => ({ type: FOLLOW, userId });
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId });
export const setUsersAC = (users) => ({ type: SET_USERS, users });
export const setCurrentPageAC = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
export const setTotalUsersCountAC = (totalUsersCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  count: totalUsersCount,
});

export default usersReducer;
