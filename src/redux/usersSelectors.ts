import { createSelector } from "reselect";
import { AppStateType } from "./redux-store";

const getUsersSelector = (state: AppStateType) => {
  return state.usersPage.users;
};

export const selectUsers = createSelector(getUsersSelector, (users) => {
  return users.filter((u) => true);
});

export const selectPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
};

export const selectTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount;
};

export const selectCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage;
};

export const selectIsLoading = (state: AppStateType) => {
  return state.usersPage.isLoading;
};

export const selectFollowingInProgress = (state: AppStateType) => {
  return state.usersPage.followingInProgress;
};

export const selectUserFilter = (state: AppStateType) => {
  return state.usersPage.filter;
};
