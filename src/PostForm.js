import React, { Component } from "react";
import { connect } from "react-redux";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

class PostForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(this.state.errors)) {
      console.info("Valid Form");
    } else {
      console.error("Invalid Form");
    }

    const created_at = this.getCreated_at.value;
    const name = this.getName.value;
    const email = this.getEmail.value;
    const status = this.getStatus.value;
    const data = {
      id: new Date(),
      created_at,
      name,
      email,
      status,
      editing: false,
    };
    this.props.dispatch({
      type: "ADD_POST",
      data,
    });
    this.getCreated_at.value = "";
    this.getName.value = "";
    this.getEmail.value = "";
    this.getStatus.value = "";
  };
  state = {
    name: null,
    email: null,
    created_at: null,
    status: null,
    errors: {
      name: "",
      email: "",
      created_at: "",
      status: "",
    },
  };
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "name":
        errors.name =
          value.length < 3
            ? "Full Name must be at least 3 characters long!"
            : "";
        break;
      case "status":
        errors.status = value.length < 5 ? " explain in brief!!" : "";
        break;

      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="post-container">
        <h1 className="post_heading">Create user form</h1>
        <form className="form" onSubmit={this.handleSubmit} noValidate>
          <input
            required
            type="text"
            name="name"
            ref={(input) => (this.getName = input)}
            placeholder="enter your name"
            onChange={this.handleChange}
            noValidate
          />
          {errors.name.length > 0 && (
            <span className="error">{errors.name}</span>
          )}
          <br />

          <input
            required
            type="text"
            name="email"
            ref={(input) => (this.getEmail = input)}
            placeholder="enter your email"
            onChange={this.handleChange}
            noValidate
          />
          {errors.email.length > 0 && (
            <span className="error">{errors.email}</span>
          )}
          <br />
          <input
            required
            type="text"
            name="created_at"
            ref={(input) => (this.getCreated_at = input)}
            placeholder="enter your birth Date"
            onChange={this.handleChange}
            noValidate
          />

          <br />
          <input
            required
            type="text"
            name="status"
            ref={(input) => (this.getStatus = input)}
            placeholder="your looking for job"
            onChange={this.handleChange}
            noValidate
          />
          {errors.status.length > 0 && (
            <span className="error">{errors.status}</span>
          )}

          <br />

          <button>SUBMIT</button>
        </form>
      </div>
    );
  }
}
export default connect()(PostForm);
