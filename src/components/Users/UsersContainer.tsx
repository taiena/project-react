import React from "react";
import { useSelector } from "react-redux";
import { Users } from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { selectIsLoading } from "../../redux/usersSelectors";

type UsersPagePropsType = { pageTitle: string };

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <>
      <h2>{props.pageTitle}</h2>
      {isLoading ? <Preloader /> : null}
      <Users />
    </>
  );
};
