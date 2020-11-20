import usersReducer, { actions, InitialStateType } from "./usersReducer";

let state: InitialStateType;

beforeEach(() => {
  state = {
    users: [
      {
        id: 0,
        name: "Vova",
        followed: false,
        photos: { small: null, large: null },
        status: "yo",
      },
      {
        id: 1,
        name: "Petya",
        followed: false,
        photos: { small: null, large: null },
        status: "hey",
      },
      {
        id: 2,
        name: "Vasya",
        followed: true,
        photos: { small: null, large: null },
        status: "hello",
      },
      {
        id: 3,
        name: "Fekla",
        followed: true,
        photos: { small: null, large: null },
        status: "wazzup",
      },
    ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isLoading: false,
    followingInProgress: [],
  };
});

test("follow success", () => {
  const newState = usersReducer(state, actions.followSuccess(1));

  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[1].followed).toBeTruthy();
});

test("unfollow success", () => {
  const newState = usersReducer(state, actions.unfollowSuccess(3));

  expect(newState.users[2].followed).toBeTruthy();
  expect(newState.users[3].followed).toBeFalsy();
});
