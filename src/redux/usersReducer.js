const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";

let initialState = {
  users: [
    // {
    //   id: 1,
    //   followed: false,
    //   fullName: "Vasiliy",
    //   status: "I am super pro",
    //   location: { city: "Murmansk", country: "Russia" },
    // },
    // {
    //   id: 2,
    //   followed: true,
    //   fullName: "Fekla",
    //   status: "I am hard to find and easy to lose",
    //   location: { city: "Olenegorsk", country: "Russia" },
    // },
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
        users: state.users.map( callbackfn: u => {
          if (u.id === action.userId) {
            return {...u, followed: true}
          }
          return u;
        }), 
      };

    // отфрендить, аналогично follow
    case UNFOLLOW: 
      return {
        ...state, 
        users: state.users.map( callbackfn: u => {
          if (u.id === action.userId) {
            return {...u, followed: false}
          }
          return u;
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
