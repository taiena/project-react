import React from "react";
import Posts from "./posts";
import {
  addPostActionCreator,
  updateNewPostTextActionCreator,
} from "../../../redux/mainReducer";
import StoreContext from "../../../StoreContext";

const PostsContainer = (props) => {
  return (
    <StoreContext.Consumer>
      {(store) => {
        let state = store.getState();

        let addPost = () => {
          store.dispatch(addPostActionCreator());
        };

        let onPostChange = (text) => {
          let action = updateNewPostTextActionCreator(text);
          store.dispatch(action);
        };

        return (
          <Posts
            updateNewPostText={onPostChange}
            addPost={addPost}
            posts={state.mainPage.posts}
            newPostText={state.mainPage.newPostText}
          />
        );
      }}
    </StoreContext.Consumer>
  );
};

export default PostsContainer;
