import React from "react";
import classes from "./Posts.module.scss";
import Post from "./Post/Post.jsx";

const Posts = (props) => {
  let postsElements = props.posts.map((p, index) => (
    <Post message={p.message} likesCount={p.likesCount} key={index} />
  ));

  let newPostElement = React.createRef();

  let onAddPost = () => {
    props.addPost();
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text);
  };

  return (
    <div className={classes.posts}>
      <div className={classes.inputpost}>
        <textarea
          onChange={onPostChange}
          ref={newPostElement}
          value={props.newPostText}
        />
        <button onClick={onAddPost}>Add post</button>
      </div>
      {postsElements}
    </div>
  );
};

export default Posts;
