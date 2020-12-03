import React from "react";
import classes from "./Post.module.scss";
import { PostType } from "../../../../types/types";

type PropsType = {
  post: PostType;
};

const Post: React.FC<PropsType> = ({ post }) => {
  return (
    <div className={classes.post}>
      {post.message}
      <div>
        <span>like </span>
        {post.likesCount}
      </div>
    </div>
  );
};

export default Post;
