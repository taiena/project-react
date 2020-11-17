import Posts from "./Posts";
import { actions } from "../../../redux/profileReducer";

import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (newPostBody) => {
      dispatch(actions.addPostActionCreator(newPostBody));
    },
  };
};

// connect создает контейнерную компоненту,
// внутри нее рендерит презентационную компоненту,
// внутрь которой в качестве пропсов передает свойства,
// которые сидят в mapStateToProps, mapDispatchToProps
// у connect свой subscriber, смотрит что надо перерисовать
// каждый раз при изменениях в стейте запускается mapStateToProps
// и формируется новый объект

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default PostsContainer;
