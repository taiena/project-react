import { profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";
const DELETE_POST = "DELETE_POST";

let initialState = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 3 },
    { id: 2, message: "It is so cool!", likesCount: 12 },
    { id: 3, message: "It is my first post", likesCount: 5 },
  ],
  profile: null,
  status: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    // добавление нового поста на стену
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.newPostBody,
        likesCount: 0,
      };
      return {
        ...state, // возвращаем поверхностную копию стейта
        // возвращаем копию массива posts и добавляем в конце новый элемент
        posts: [...state.posts, newPost],
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
    // удалить пост (еще не реализовано, для теста)
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };
    default:
      return state;
  }
};

export const addPostActionCreator = (newPostBody) => ({
  type: ADD_POST,
  newPostBody,
});
export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});
export const setUserStatus = (status) => ({
  type: SET_USER_STATUS,
  status,
});
export const deletePost = (postId) => ({
  type: DELETE_POST,
  postId,
});

//thunk
export const getUserProfile = (userId) => async (dispatch) => {
  let response = await profileAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
};

export const getUserStatus = (userId) => async (dispatch) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setUserStatus(response.data));
};

export const updateUserStatus = (status) => async (dispatch) => {
  let response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setUserStatus(status));
  }
};

export default profileReducer;
