import React from "react";
import classes from "./Posts.module.scss";
import Post from "./Post/Post";
import { selectPosts } from "../../../redux/profileSelectors";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../../redux/profileReducer";
import AddMessageForm, {
  NewMessageFormValuesType,
} from "../../common/AddMessageForm/AddMessageForm";

type PropsType = {};

const Posts: React.FC<PropsType> = () => {
  const posts = useSelector(selectPosts);

  const dispatch = useDispatch();

  let addNewPost = (values: NewMessageFormValuesType) => {
    dispatch(actions.addPostActionCreator(values.body));
  };

  let postsElements = posts.map((post, index) => (
    <Post post={post} key={index} />
  ));

  return (
    <div className={classes.Posts}>
      <AddMessageForm
        onSubmit={addNewPost}
        text={"add post"}
        placeholder={"Enter post here"}
      />
      {postsElements}
    </div>
  );
};

export default Posts;
