import React from "react";
import classes from "./posts.module.scss";
import Post from "./post/post.jsx";

const Posts = (props) => {
  let posts = [
    { id: 1, message: "Hi, how are you?", likesCount: 3 },
    { id: 2, message: "It is so amazing!", likesCount: 12 },
    { id: 3, message: "It is my first post", likesCount: 5 },
  ];

  let postsElements = posts.map((p) => (
    <Post message={p.message} likesCount={p.likesCount} />
  ));

  return (
    <div className={classes.posts}>
      <div className={classes.inputpost}>
        <textarea></textarea>
        <button>Add post</button>
      </div>
      {postsElements}
    </div>
  );
};

export default Posts;

// пример без массива, с передачей пропсов

// const Posts = (props) => {
//   return (
//     <div className={classes.posts}>
//       <Post message="Hi, how are you?" likesCount="1" />
//       <Post message="It is my first post" likesCount="5" />
//     </div>
//   );
// };
