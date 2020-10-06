import { profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";

let initialState = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 3 },
    { id: 2, message: "It is so cool!", likesCount: 12 },
    { id: 3, message: "It is my first post", likesCount: 5 },
  ],
  newPostText: "Enter your post here", // value from textarea
  profile: null,
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

//thunk
export const getProfile = (userId) => {
  return (dispatch) => {
    profileAPI.getProfile(userId).then((data) => {
      dispatch(setUserProfile(data));
    });
  };
};

export default profileReducer;
