import React, { useEffect, useState } from "react";
import classes from "./darkMode.module.scss";

type DarkModeProps = {
  changeTheme: () => void;
};

const darkMode = <WCP extends object>(
  WrappedComponent: React.ComponentType<WCP>
): React.FC<WCP & DarkModeProps> => ({ ...props }: DarkModeProps) => {
  // function return true if darkMode
  const getInitialMode = () => {
    const item = localStorage.getItem("dark");
    const savedMode = JSON.parse(`${item}`);
    return savedMode || false;
  };

  const [darkMode, setDarkMode] = useState(getInitialMode());

  const changeTheme = () => {
    setDarkMode((prevMode: boolean) => !prevMode);
  };

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className={darkMode ? classes.darkMode : classes.lightMode}>
      <WrappedComponent {...(props as WCP)} changeTheme={changeTheme} />
    </div>
  );
};
export default darkMode;
