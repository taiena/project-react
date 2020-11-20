import { usersAPI } from "../api/usersApi";
import { updateObjectInArray } from "../utils/objectHelpers";
import { UserType } from "../types/types";
import { InferActionsTypes, BaseThunkType } from "./redux-store";
import { Dispatch } from "redux";

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
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;

const usersReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    // function updateObjectInArray takes:
    // array items (send state.users),
    // itemId (send action.userId),
    // property name objPropName (send "id"),
    // оobject with properties newObjProps (send followed: true),
    case "FOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };

    case "UNFOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };

    case "SET_USERS":
      return {
        ...state,
        users: [...action.users], // add new users to the array of users
      };

    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.currentPage,
      };

    case "SET_TOTAL_USERS_COUNT":
      return {
        ...state,
        totalUsersCount: action.count,
      };

    // preloader, action will be true / false
    case "TOGGLE_IS_LOADING":
      return {
        ...state,
        isLoading: action.isLoading,
      };

    // unactive follow button while following
    case "TOGGLE_IS_FOLLOWING_PROGRESS":
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

export const actions = {
  followSuccess: (userId: number) =>
    ({
      type: "FOLLOW",
      userId,
    } as const),

  unfollowSuccess: (userId: number) =>
    ({
      type: "UNFOLLOW",
      userId,
    } as const),

  setUsers: (users: Array<UserType>) =>
    ({
      type: "SET_USERS",
      users,
    } as const),

  setCurrentPage: (currentPage: number) =>
    ({
      type: "SET_CURRENT_PAGE",
      currentPage,
    } as const),

  setTotalUsersCount: (totalUsersCount: number) =>
    ({
      type: "SET_TOTAL_USERS_COUNT",
      count: totalUsersCount,
    } as const),

  toggleIsLoading: (isLoading: boolean) =>
    ({
      type: "TOGGLE_IS_LOADING",
      isLoading,
    } as const),

  toggleFollowingProgress: (isLoading: boolean, userId: number) =>
    ({
      type: "TOGGLE_IS_FOLLOWING_PROGRESS",
      isLoading,
      userId,
    } as const),
};

export const requestUsers = (
  currentPage: number,
  pageSize: number
): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleIsLoading(true));
    dispatch(actions.setCurrentPage(currentPage));

    let data = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(actions.toggleIsLoading(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
  };
};

const _followUnfollowFlow = async (
  dispatch: Dispatch<ActionsTypes>,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => ActionsTypes
) => {
  dispatch(actions.toggleFollowingProgress(true, userId));

  // apiMethod may be follow / unfollow
  let data = await apiMethod(userId);

  // actionCreator may be followSuccess / unfollowSuccess
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    await _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.follow,
      actions.followSuccess
    );
  };
};

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    await _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unfollow,
      actions.unfollowSuccess
    );
  };
};

export default usersReducer;
