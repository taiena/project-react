import React, { Component } from "react";

export default class ProfileStatus extends Component {
  state = {
    editMode: false,
  };

  onToggleEditMode = () => {
    this.setState((state) => ({
      editMode: !state.editMode,
    }));
  };

  render() {
    return (
      <div>
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.onToggleEditMode}>
              status: {this.props.status}
            </span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input
              autoFocus={true}
              onBlur={this.onToggleEditMode}
              value={this.props.status}
            />
          </div>
        )}
      </div>
    );
  }
}
