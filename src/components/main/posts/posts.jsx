import React from "react";
import classes from "./posts.module.scss";
import Post from "./post/post.jsx";

const Posts = () => {
  return (
    <div className={classes.posts}>
      <div className={classes.inputpost}>
        <textarea></textarea>
        <button>Add post</button>
      </div>
      <Post message="Hi, how are you?" likesCount="1" />
      <Post message="It is my first post" likesCount="5" />
    </div>
  );
};

export default Posts;
