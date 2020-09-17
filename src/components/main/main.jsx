import React from "react";
import classes from "./main.module.scss";
import PostsContainer from "./posts/postsContainer.jsx";
import Profile from "./profile/profile.jsx";
import MainHeader from "./mainHeader/mainHeader.jsx";

const Main = (props) => {
  return (
    <main className={classes.mainPage}>
      <MainHeader />
      <Profile />
      <PostsContainer />
    </main>
  );
};

export default Main;
