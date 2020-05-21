import React from "react";
import classes from "./main.module.scss";
import Posts from "./posts/posts.jsx";
import Profile from "./profile/profile.jsx";
import MainHeader from "./mainHeader/mainHeader.jsx";

const Main = (props) => {
  return (
    <main className={classes.mainPage}>
      <MainHeader />
      <Profile />
      <Posts
        posts={props.mainPage.posts}
        newPostText={props.mainPage.newPostText}
        dispatch={props.dispatch}
      />
    </main>
  );
};

export default Main;
