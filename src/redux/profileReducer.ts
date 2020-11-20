import { profileAPI } from "../api/profileApi";
import { stopSubmit, FormAction } from "redux-form";
import { BaseThunkType, InferActionsTypes } from "./redux-store";
import { PhotosType, PostType, ProfileType } from "../types/types";

let initialState = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 3 },
    { id: 2, message: "It is so cool!", likesCount: 12 },
    { id: 3, message: "It is my first post", likesCount: 5 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
};

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
// FormAction need to stopSubmit
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;

const profileReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "ADD_POST": {
      let newPost = {
        id: 5,
        message: action.newPostBody, // take text from textarea
        likesCount: 0,
      };
      return {
        ...state,
        // add a new post to a copy of the posts array
        posts: [...state.posts, newPost],
      };
    }

    case "SET_USER_PROFILE": {
      return {
        ...state,
        profile: action.profile,
      };
    }

    case "SET_USER_STATUS": {
      return {
        ...state,
        status: action.status,
      };
    }

    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };

    case "SAVE_PHOTO_SUCCESS":
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };

    default:
      return state;
  }
};

export const actions = {
  addPostActionCreator: (newPostBody: string) =>
    ({
      type: "ADD_POST",
      newPostBody,
    } as const),

  setUserProfile: (profile: ProfileType) =>
    ({
      type: "SET_USER_PROFILE",
      profile,
    } as const),

  setUserStatus: (status: string) =>
    ({
      type: "SET_USER_STATUS",
      status,
    } as const),

  deletePost: (postId: number) =>
    ({
      type: "DELETE_POST",
      postId,
    } as const),

  savePhotoSuccess: (photos: PhotosType) =>
    ({
      type: "SAVE_PHOTO_SUCCESS",
      photos,
    } as const),
};

export const getUserProfile = (userId: number): ThunkType => async (
  dispatch
) => {
  let data = await profileAPI.getProfile(userId);
  dispatch(actions.setUserProfile(data));
};

export const getUserStatus = (userId: number): ThunkType => async (
  dispatch
) => {
  let data = await profileAPI.getStatus(userId);
  dispatch(actions.setUserStatus(data));
};

export const updateUserStatus = (status: string): ThunkType => async (
  dispatch
) => {
  let data = await profileAPI.updateStatus(status);
  if (data.resultCode === 0) {
    dispatch(actions.setUserStatus(status));
  }
};

export const saveUserPhoto = (file: File): ThunkType => async (dispatch) => {
  let data = await profileAPI.savePhoto(file);
  if (data.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(data.data.photos));
  }
};

// profile update after sending photo
export const saveUserProfile = (profile: ProfileType): ThunkType => async (
  dispatch,
  getState
) => {
  const userId = getState().auth.id;
  const data = await profileAPI.saveProfile(profile);

  if (data.resultCode === 0) {
    if (userId !== null) {
      dispatch(getUserProfile(userId));
    } else {
      throw new Error("userId cannot be null");
    }
  } else {
    dispatch(stopSubmit("edit-profile", { _error: data.messages[0] }));
    return Promise.reject(data.messages[0]);
  }
};

export default profileReducer;
