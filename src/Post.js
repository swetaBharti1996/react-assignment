import React, { Component } from "react";
import { connect } from "react-redux";

class Post extends Component {
  render() {
    return (
      <div className="post">
        <p className="post_message">
          Name:<span>{this.props.post.name}</span>
        </p>
        <p className="post_message">
          Email:<span>{this.props.post.email}</span>
        </p>
        <p className="post_message">
          Date of Birth:<span>{this.props.post.created_at}</span>
        </p>
        <p className="post_message">
          Status:<span>{this.props.post.status}</span>
        </p>

        <div className="control-buttons">
          <button
            className="edit"
            onClick={() =>
              this.props.dispatch({ type: "EDIT_POST", id: this.props.post.id })
            }
          >
            Edit
          </button>
          <button
            className="delete"
            onClick={() =>
              this.props.dispatch({
                type: "DELETE_POST",
                id: this.props.post.id,
              })
            }
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}
export default connect()(Post);
