import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/objectHelpers";
import { UserType } from "../types/types";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_LOADING = "TOGGLE_IS_LOADING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 5 as number,
  totalUsersCount: 0 as number,
  currentPage: 1 as number,
  isLoading: false as boolean,
  // put the user id into the array followingInProgress while following
  // remove the user id from the array when followed / unfollowed
  followingInProgress: [] as Array<number>,
};

export type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    // function updateObjectInArray takes:
    // array items (transfer state.users),
    // itemId (transferaction.userId),
    // property name objPropName (transfer"id"),
    // оobject with properties newObjProps (transfer followed: true),
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };

    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };

    case SET_USERS:
      return {
        ...state,
        users: [...action.users], // add new users to the array of users
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };

    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.count,
      };

    // preloader, action will be true / false
    case TOGGLE_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    // unactive follow button while following
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        // while following (isLoading true), add user id to the array if users
        followingInProgress: action.isLoading
          ? [...state.followingInProgress, action.userId]
          : // if follow completed (isLoading false), filter followed user from the array,
            // pass through filter those id who are not equal id from action
            state.followingInProgress.filter((id) => id !== action.userId),
      };

    default:
      return state;
  }
};

type FollowSuccessActionType = {
  type: typeof FOLLOW;
  userId: number;
};

export const followSuccess = (userId: number): FollowSuccessActionType => ({
  type: FOLLOW,
  userId,
});

type UnfollowSuccessActionType = {
  type: typeof UNFOLLOW;
  userId: number;
};

export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({
  type: UNFOLLOW,
  userId,
});

type SetUsersActionType = {
  type: typeof SET_USERS;
  users: Array<UserType>;
};

export const setUsers = (users: Array<UserType>): SetUsersActionType => ({
  type: SET_USERS,
  users,
});

type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};

export const setCurrentPage = (
  currentPage: number
): SetCurrentPageActionType => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  count: number;
};

export const setTotalUsersCount = (
  totalUsersCount: number
): SetTotalUsersCountActionType => ({
  type: SET_TOTAL_USERS_COUNT,
  count: totalUsersCount,
});

type ToggleIsLoadingActionType = {
  type: typeof TOGGLE_IS_LOADING;
  isLoading: boolean;
};

export const toggleIsLoading = (
  isLoading: boolean
): ToggleIsLoadingActionType => ({
  type: TOGGLE_IS_LOADING,
  isLoading,
});

type ToggleFollowingProgressActionType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
  isLoading: boolean;
  userId: number;
};

export const toggleFollowingProgress = (
  isLoading: boolean,
  userId: number
): ToggleFollowingProgressActionType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isLoading,
  userId,
});

export const requestUsers = (currentPage: number, pageSize: number) => {
  return async (dispatch: any) => {
    dispatch(toggleIsLoading(true));
    dispatch(setCurrentPage(currentPage));

    let response = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(toggleIsLoading(false));
    dispatch(setUsers(response.data.items));
    dispatch(setTotalUsersCount(response.data.totalCount));
  };
};

const followUnfollowFlow = async (
  dispatch: any,
  userId: number,
  apiMethod: any,
  actionCreator: any
) => {
  dispatch(toggleFollowingProgress(true, userId));

  // apiMethod may be follow / unfollow
  let response = await apiMethod(userId);

  // actionCreator may be followSuccess / unfollowSuccess
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId: number) => {
  return async (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, usersAPI.follow, followSuccess);
  };
};

export const unfollow = (userId: number) => {
  return async (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unfollow, unfollowSuccess);
  };
};

export default usersReducer;
