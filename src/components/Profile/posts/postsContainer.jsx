import React from "react";
import Posts from "./posts";
import {
  addPostActionCreator,
  updateNewPostTextActionCreator,
} from "../../../redux/mainReducer";

import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    posts: state.mainPage.posts,
    newPostText: state.mainPage.newPostText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateNewPostText: (text) => {
      let action = updateNewPostTextActionCreator(text);
      dispatch(action);
    },
    addPost: () => {
      dispatch(addPostActionCreator());
    },
  };
};

// connect создает контейнерную компоненту,
// внутри нее рендерит презентационную компоненту,
// внутрь которой в качестве пропсов передает свойства,
// которые сидят в mapStateToProps, mapDispatchToProps
// у connect свой subscriber, смотрит что надо перерисовать
// каждый раз при изменениях в стейте запускается mapStateToProps
// и формируется новый объект

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default PostsContainer;
