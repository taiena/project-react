import { profileAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

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

    // установить новое фото
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
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

export const savePhotoSuccess = (photos) => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
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

export const saveUserPhoto = (file) => async (dispatch) => {
  let response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
};

// чтобы после отправки профиль обновился, гнадо задиспатчить getUserProfile
// для этого получаем наш айди - берем весь стейт (getState приходит в thunk)
// и достаем id из initialState в autnReducer
export const saveUserProfile = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.id;
  const response = await profileAPI.saveProfile(profile);

  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userId));
  } else {
    dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }));
    return Promise.reject(response.data.messages[0]);
  }
};

export default profileReducer;
