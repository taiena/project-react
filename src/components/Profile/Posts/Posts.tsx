import React from "react";
import classes from "./Posts.module.scss";
import Post from "./Post/Post";
import AddPostForm, { AddPostFormValuesType } from "./AddPostForm/AddPostForm";
import { PostType } from "../../../types/types";

export type MapPropsType = {
  posts: Array<PostType>;
};
export type DispatchPropsType = {
  addPost: (newPostBody: string) => void;
};

const Posts: React.FC<MapPropsType & DispatchPropsType> = (props) => {
  let addNewPost = (values: AddPostFormValuesType) => {
    props.addPost(values.newPostBody);
  };

  let postsElements = props.posts.map((p, index) => (
    <Post message={p.message} likesCount={p.likesCount} key={index} />
  ));

  return (
    <div className={classes.posts}>
      <div className={classes.inputpost}>
        <AddPostForm onSubmit={addNewPost} />
      </div>
      {postsElements}
    </div>
  );
};

export default Posts;
