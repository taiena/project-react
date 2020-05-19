import React from "react";
import classes from "./posts.module.scss";
import Post from "./post/post.jsx";

const Posts = (props) => {
  let postsElements = props.posts.map((p) => (
    <Post message={p.message} likesCount={p.likesCount} />
  ));

  let newPostElement = React.createRef();

  let addPost = () => {
    let text = newPostElement.current.value;
    props.addPost(text);
    newPostElement.current.value = " ";
  };

  return (
    <div className={classes.posts}>
      <div className={classes.inputpost}>
        <textarea ref={newPostElement}></textarea>
        <button onClick={addPost}>Add post</button>
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
