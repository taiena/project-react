import React from "react";
import Posts from "./posts";
import {
  addPostActionCreator,
  updateNewPostTextActionCreator,
} from "../../../redux/mainReducer";

const PostsContainer = (props) => {
  let state = props.store.getState();

  let addPost = () => {
    props.store.dispatch(addPostActionCreator());
  };

  let onPostChange = (text) => {
    let action = updateNewPostTextActionCreator(text);
    props.store.dispatch(action);
  };

  return (
    <Posts
      updateNewPostText={onPostChange}
      addPost={addPost}
      posts={state.mainPage.posts}
      newPostText={state.mainPage.newPostText}
    />
  );
};

export default PostsContainer;
