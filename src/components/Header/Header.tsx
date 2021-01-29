import React, { useEffect } from "react";
import classes from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import {
  selectIsAuth,
  selectLogin,
  selectPhoto,
  selectId,
} from "../../redux/authSelectors";
import { logout, getOwnerPhoto } from "../../redux/authReducer";
import { useSelector, useDispatch } from "react-redux";
import { Button, ButtonTypes } from "../common/Button/Button";
import userAva from "../../assets/images/ava.svg";

export type PropsType = {
  changeTheme: () => void;
};

const Header: React.FC<PropsType> = ({ changeTheme }) => {
  const isAuth = useSelector(selectIsAuth);
  const login = useSelector(selectLogin);
  const ownerId = useSelector(selectId);
  const ownerPhoto = useSelector(selectPhoto);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPhoto = () => {
      let userId: number | null = ownerId;
      if (!userId) {
        console.log("no id in header");
      } else {
        dispatch(getOwnerPhoto(userId));
      }
    };

    getPhoto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownerPhoto, ownerId]);

  const logoutCallback = () => {
    dispatch(logout());
  };

  return (
    <header className={classes.Header}>
      <div className={classes.Logo}>
        <span className={classes.LogoSocial}>SOCIAL</span>
        <span className={classes.LogoDev}>DEV</span>
      </div>
      <div className={classes.Theme}>
        <span onClick={changeTheme}>change theme</span>
      </div>

      <div className={classes.LoginBlock}>
        {isAuth ? (
          <div className={classes.Logined}>
            {login}
            <div className={classes.Ava}>
              <img src={ownerPhoto || userAva} alt="" />
            </div>
            <div>
              <Button
                onClick={logoutCallback}
                type={ButtonTypes.Login}
                text="logout"
              />
            </div>
          </div>
        ) : (
          <div className={classes.UnLogined}>
            <Button type={ButtonTypes.Login}>
              <NavLink to={"/login"}>
                <span className={classes.LoginLink}>LOGIN</span>
              </NavLink>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
