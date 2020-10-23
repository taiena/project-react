import { usersAPI } from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_LOADING = "TOGGLE_IS_LOADING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isLoading: false,
  // когда идет френдинг, закидываем в массив айди юзера,
  // когда идет отфрендинг, забираем айди
  followingInProgress: [],
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

    // прелоадер, в action будет значение true / false
    case TOGGLE_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    // юзер в процессе френдинга
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        // если идет френдинг (isLoading true), добавим в массив айди этого юзера
        followingInProgress: action.isLoading
          ? [...state.followingInProgress, action.userId]
          : // если френдинг завершен (isLoading false), отфильтруем из массива юзера,
            // пропускаем только те айди, которые не равны айди пришедшей из экшена
            // деструктуризация не нужна, тк фильтрация уже вернет новый массив
            state.followingInProgress.filter((id) => id !== action.userId),
      };

    default:
      return state;
  }
};

export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
export const setTotalUsersCount = (totalUsersCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  count: totalUsersCount,
});
export const toggleIsLoading = (isLoading) => ({
  type: TOGGLE_IS_LOADING,
  isLoading,
});
export const toggleFollowingProgress = (isLoading, userId) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isLoading,
  userId,
});

//thunk
export const requestUsers = (currentPage, pageSize) => {
  return async (dispatch) => {
    dispatch(toggleIsLoading(true));
    dispatch(setCurrentPage(currentPage));

    let response = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(toggleIsLoading(false));
    dispatch(setUsers(response.data.items));
    dispatch(setTotalUsersCount(response.data.totalCount));
  };
};

export const follow = (userId) => {
  return async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId));

    let response = await usersAPI.follow(userId);

    if (response.data.resultCode === 0) {
      dispatch(followSuccess(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
  };
};

export const unfollow = (userId) => {
  return async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId));

    let response = await usersAPI.unfollow(userId);

    if (response.data.resultCode === 0) {
      dispatch(unfollowSuccess(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
  };
};

export default usersReducer;
