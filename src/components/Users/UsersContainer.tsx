import React from "react";
import { useSelector } from "react-redux";
import { Users } from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { getIsLoading } from "../../redux/usersSelectors";

type UsersPagePropsType = { pageTitle: string };

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {
  const isLoading = useSelector(getIsLoading);

  return (
    <>
      <h2>{props.pageTitle}</h2>
      {isLoading ? <Preloader /> : null}
      <Users />
    </>
  );
};
