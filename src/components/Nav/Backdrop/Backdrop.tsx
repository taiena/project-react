import React from "react";
import classes from "./Backdrop.module.scss";

type PropsType = { closeMenuMode: () => void };

const Backdrop: React.FC<PropsType> = (props) => {
  return <div className={classes.Backdrop} onClick={props.closeMenuMode} />;
};

export default Backdrop;
