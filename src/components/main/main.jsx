import React from "react";
import classes from "./main.module.scss";

const Main = () => {
  return (
    <main className={classes.main}>
      <div>
        <img
          src="https://i.baraholka.com.ru/files/1/8/1862507_5.jpg"
          alt="header pic"
        ></img>
      </div>
      <div>ava + description</div>
      <div className={classes.posts}>
        my posts
        <div className={classes.post}>Post 1</div>
        <div className={classes.post}>Post 2</div>
      </div>
    </main>
  );
};

export default Main;
