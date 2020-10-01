import React, { Component } from "react";
import * as axios from "axios";
import {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsLoading,
} from "../../redux/usersReducer.js";
import { connect } from "react-redux";
import Users from "./Users.jsx";
import Preloader from "../common/Preloader/Preloader";

class UsersContainer extends Component {
  componentDidMount() {
    this.props.toggleIsLoading(true);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`,
        {
          withCredentials: true,
        }
      )
      // после получения api приходит response, в нем сидит data, в ней массив items
      .then((response) => {
        this.props.toggleIsLoading(false);
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount);
      });
  }

  // при клике на номер страницы новый запрос апи с pageNumber
  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.toggleIsLoading(true);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        this.props.toggleIsLoading(false);
        this.props.setUsers(response.data.items);
      });
  };

  render() {
    return (
      <>
        {this.props.isLoading ? (
          <Preloader />
        ) : (
          <Users
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            users={this.props.users}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
          />
        )}
      </>
    );
  }
}

// в компоненту Users придут в пропсах данные из стейта
let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isLoading: state.usersPage.isLoading,
  };
};

// connect создает контейнерную компоненту,
// внутри нее рендерит презентационную компоненту,
// внутрь которой в качестве пропсов передает свойства,
// которые сидят в mapStateToProps
// и объекты, которые раньше были в mapDispatchToProps
// каждый раз при изменениях в стейте запускается mapStateToProps
// и формируется новый объект

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsLoading,
})(UsersContainer);
