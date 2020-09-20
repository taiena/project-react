const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";

let initialState = {
  users: [
    {
      id: 1,
      followed: false,
      avaUrl: "https://avatars.mitosa.net/cat/up-006.jpg",
      fullName: "Vasiliy",
      status: "I am super pro",
      location: { city: "Murmansk", country: "Russia" },
    },
    {
      id: 2,
      followed: true,
      avaUrl: "https://avatars.mitosa.net/cat/up-006.jpg",
      fullName: "Fekla",
      status: "I am hard to find and easy to lose",
      location: { city: "Olenegorsk", country: "Russia" },
    },
  ],
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
        users: [...state.users, ...action.users],
      };

    default:
      return state;
  }
};

// в actionCreator кроме типа придет еще и айди юзера
export const followAC = (userId) => ({ type: FOLLOW, userId });
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId });
export const setUsersAC = (users) => ({ type: SET_USERS, users });

export default usersReducer;
