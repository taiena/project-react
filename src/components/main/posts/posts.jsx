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
      <Post />
      <Post />
    </div>
  );
};

export default Posts;
