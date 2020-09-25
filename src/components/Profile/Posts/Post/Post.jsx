import React from "react";
import classes from "./Post.module.scss";

const Post = (props) => {
  return (
    <div className={classes.post}>
      {props.message}
      <div>
        <span>like </span>
        {props.likesCount}
      </div>
    </div>
  );
};

export default Post;
