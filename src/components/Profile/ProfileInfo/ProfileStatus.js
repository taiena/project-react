import React, { Component } from "react";

export default class ProfileStatus extends Component {
  // из глобального стейта в пропсах приходит статус (отображается в спане),
  // записывается в локальный стейт (отображается в инпуте),
  // меняется локальный стейт в инпуте, диспатчится в редакс
  // там меняется глобальный стейт и опять приходит сюда с пропсами

  state = {
    editMode: false,
    status: this.props.status,
  };

  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };

  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateUserStatus(this.state.status);
  };

  // если value в инпуте зафиксировано, вешаем туда onChange
  // и создаем метод для работы с инпутом
  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      });
    }
  }

  render() {
    return (
      <div>
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || "no status"}
            </span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input
              onChange={this.onStatusChange}
              autoFocus={true}
              onBlur={this.deactivateEditMode}
              value={this.state.status}
            />
          </div>
        )}
      </div>
    );
  }
}
