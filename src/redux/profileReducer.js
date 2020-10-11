import { profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";

let initialState = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 3 },
    { id: 2, message: "It is so cool!", likesCount: 12 },
    { id: 3, message: "It is my first post", likesCount: 5 },
  ],
  newPostText: "Enter your post here", // value from textarea
  profile: null,
  status: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    // добавление нового поста на стену
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: state.newPostText,
        likesCount: 0,
      };
      return {
        ...state, // возвращаем поверхностную копию стейта
        // возвращаем копию массива posts и добавляем в конце новый элемент
        posts: [...state.posts, newPost],
        newPostText: "", // обнуляем textarea
      };
    }

    // добавление в стейт нового впечатанного символа
    case UPDATE_NEW_POST_TEXT: {
      return {
        ...state,
        newPostText: action.newText, // добавляем впечатанный символ из textarea
      };
    }

    // задать страницу пользователя
    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile, // получаем профиль
      };
    }
    // задать статус пользователя
    case SET_USER_STATUS: {
      return {
        ...state,
        status: action.status, // получаем статус
      };
    }
    default:
      return state;
  }
};

export const addPostActionCreator = () => ({ type: ADD_POST });
export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});
export const updateNewPostTextActionCreator = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text,
});
export const setUserStatus = (status) => ({
  type: SET_USER_STATUS,
  status,
});

//thunk
export const getUserProfile = (userId) => {
  return (dispatch) => {
    profileAPI.getProfile(userId).then((response) => {
      dispatch(setUserProfile(response.data));
    });
  };
};

export const getUserStatus = (userId) => {
  return (dispatch) => {
    profileAPI.getStatus(userId).then((response) => {
      dispatch(setUserStatus(response.data));
    });
  };
};

export const updateUserStatus = (status) => {
  return (dispatch) => {
    profileAPI.updateStatus(status).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
      }
    });
  };
};

export default profileReducer;
