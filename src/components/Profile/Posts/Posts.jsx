import React from "react";
import classes from "./Posts.module.scss";
import Post from "./Post/Post.jsx";
import { Field, reduxForm } from "redux-form";

const Posts = (props) => {
  // в values приходят параметры Field
  let addNewPost = (values) => {
    props.addPost(values.newPostBody);
  };

  let postsElements = props.posts.map((p, index) => (
    <Post message={p.message} likesCount={p.likesCount} key={index} />
  ));

  return (
    <div className={classes.posts}>
      <div className={classes.inputpost}>
        <AddPostReduxForm onSubmit={addNewPost} />
      </div>
      {postsElements}
    </div>
  );
};

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        component="textarea"
        name="newPostBody"
        placeholder="Enter your post here"
      />
      <button>Add post</button>
    </form>
  );
};

const AddPostReduxForm = reduxForm({
  form: "post",
})(AddPostForm);

export default Posts;
