import React, { Component } from "react";
import { connect } from "react-redux";

class EditComponent extends Component {
  handleEdit = (e) => {
    e.preventDefault();
    const newCreated_at = this.getCreated_at.value;
    const newName = this.getName.value;
    const newEmail = this.getEmail.value;
    const newStatus = this.getStatus.value;
    const data = {
      newName,
      newEmail,
      newCreated_at,
      newStatus,
    };
    this.props.dispatch({ type: "UPDATE", id: this.props.post.id, data: data });
  };
  render() {
    return (
      <div key={this.props.post.id} className="post">
        <form className="form" onSubmit={this.handleEdit}>
          <input
            required
            type="text"
            ref={(input) => (this.getName = input)}
            defaultValue={this.props.post.name}
            placeholder="Enter your name"
          />
          <br />
          <input
            required
            type="text"
            ref={(input) => (this.getEmail = input)}
            defaultValue={this.props.post.email}
            placeholder="Enter your email"
          />

          <br />
          <input
            required
            type="text"
            ref={(input) => (this.getCreated_at = input)}
            defaultValue={this.props.post.created_at}
            placeholder="Enter your birth date"
          />
          <br />
          <input
            required
            type="text"
            ref={(input) => (this.getCreated_at = input)}
            defaultValue={this.props.post.status}
            placeholder="your looking for job"
          />
          <br />

          <button>Update</button>
        </form>
      </div>
    );
  }
}
export default connect()(EditComponent);
