import Posts, { DispatchPropsType, MapPropsType } from "./Posts";
import { actions } from "../../../redux/profileReducer";
import { AppStateType } from "../../../redux/redux-store";
import { connect } from "react-redux";

const mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
  };
};

const PostsContainer = connect<
  MapPropsType,
  DispatchPropsType,
  {},
  AppStateType
>(mapStateToProps, {
  addPost: actions.addPostActionCreator,
})(Posts);

export default PostsContainer;
