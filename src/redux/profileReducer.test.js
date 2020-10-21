import profileReducer, {
  addPostActionCreator,
  deletePost,
} from "./profileReducer";

let state = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 3 },
    { id: 2, message: "It is so cool!", likesCount: 12 },
    { id: 3, message: "It is my first post", likesCount: 5 },
  ],
};

it("length of posts should be incremented", () => {
  // 1. test data
  let action = addPostActionCreator("test post");

  // 2. action
  let newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.posts.length).toBe(4);
});

it("message of new post should be correct", () => {
  let action = addPostActionCreator("test post");

  let newState = profileReducer(state, action);

  expect(newState.posts[3].message).toBe("test post");
});

it("after deleting length of messages should be decrement", () => {
  let action = deletePost(1);

  let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(2);
});

it(`after deleting length shouldn't be decrement if id is incorrect`, () => {
  let action = deletePost(1000);

  let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(3);
});
