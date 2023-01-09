import React, { Component } from "react";
import LogInForm from "./LogInForm.jsx";
import { validateLoginForm } from "../../utils/validators.js";
import "./styles.css";

import axios from "axios";

class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        username: "",
        password: "",
      },
      btnTxt: "show",
      type: "password",
    };

    this.pwMask = this.pwMask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user,
    });
  }

  submitLogin(user) {
    var params = { username: user.username, password: user.password };
    axios
      .post("http://localhost:3001/auth", params)
      .then((res) => {
        if (res.data.success === true) {
          let session = JSON.stringify(res.data.session);
          localStorage.setItem("session", session);
          window.location.reload();
        } else {
          this.setState({
            errors: { message: res.data.message },
          });
        }
      })
      .catch((err) => {
        this.setState({
          errors: {
            message: "Connection Error: Unable to connect to server",
            err,
          },
        });
      });
  }

  validateForm(event) {
    event.preventDefault();
    var payload = validateLoginForm(this.state.user);
    if (payload.success) {
      this.setState({
        errors: {},
      });
      var user = {
        username: this.state.user.username,
        password: this.state.user.password,
      };
      this.submitLogin(user);
    } else {
      const errors = payload.errors;
      this.setState({
        errors,
      });
    }
  }

  pwMask(event) {
    event.preventDefault();
    this.setState((state) =>
      Object.assign({}, state, {
        type: this.state.type === "password" ? "input" : "password",
        btnTxt: this.state.btnTxt === "show" ? "hide" : "show",
      })
    );
  }

  render() {
    return (
      <div>
        <LogInForm
          onSubmit={this.validateForm}
          onChange={this.handleChange}
          errors={this.state.errors}
          user={this.state.user}
          btnTxt={this.state.btnTxt}
          type={this.state.type}
          pwMask={this.pwMask}
        />
      </div>
    );
  }
}

export default LogIn;
