import React from "react";

//import Preloader from "../../common/Preloader/Preloader";
//import s from "./Profileinfo.module.css";

class ProfileStatus extends React.Component {
  statusInputRef = React.createRef;

  state = {
    editMode: false,
    status: this.props.status,
  };

  activateEditMode = () => {
    this.setState({
      //this.setState({...}) меняет локальный state,наследуется от React.Component
      editMode: true,
    });
  };
  deactivateEditMode = () => {
    this.setState({
      //this.setState({...}) меняет локальный state,наследуется от React.Component
      editMode: false,
    });
    this.props.updateStatus(this.state.status);
  };
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
    console.log(" componentDidUpdate");
  }

  render() {
    return (
      <>
        <div>
          {!this.state.editMode && (
            <div>
              <span onDoubleClick={this.activateEditMode}>
                {this.props.status || "No status"}
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
      </>
    );
  }
}

export default ProfileStatus;
