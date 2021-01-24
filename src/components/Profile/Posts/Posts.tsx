import React from "react";
import classes from "./Posts.module.scss";
import Post from "./Post/Post";
import AddPostForm, { AddPostFormValuesType } from "./AddPostForm/AddPostForm";
import { selectPosts } from "../../../redux/profileSelectors";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../../redux/profileReducer";

type PropsType = {};

const Posts: React.FC<PropsType> = () => {
  const posts = useSelector(selectPosts);

  const dispatch = useDispatch();

  let addNewPost = (values: AddPostFormValuesType) => {
    dispatch(actions.addPostActionCreator(values.newPostBody));
  };

  let postsElements = posts.map((post, index) => (
    <Post post={post} key={index} />
  ));

  return (
    <div className={classes.Posts}>
      <AddPostForm onSubmit={addNewPost} />
      {postsElements}
    </div>
  );
};

export default Posts;
