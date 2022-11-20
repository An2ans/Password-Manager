import React, { Component } from "react";
import SignUpForm from "./SignUpForm.jsx";
import { validateSignUpForm } from "../../utils/validators.js";
import "./styles.css";

import axios from "axios";
const zxcvbn = require("zxcvbn");

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        username: "",
        email: "",
        password: "",
        pwconfirm: "",
      },
      btnTxt: "show",
      type: "password",
      score: "0",
    };

    this.pwMask = this.pwMask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.pwHandleChange = this.pwHandleChange.bind(this);
  }

  handleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user,
    });
  }

  pwHandleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user,
    });

    if (event.target.value === "") {
      this.setState((state) =>
        Object.assign({}, state, {
          score: "null",
        })
      );
    } else {
      var pw = zxcvbn(event.target.value);
      this.setState((state) =>
        Object.assign({}, state, {
          score: pw.score + 1,
        })
      );
    }
  }

  submitSignup(user) {
    var params = {
      username: user.username,
      password: user.password,
      email: user.email,
    };

    console.log({ params });
    axios
      .post("http://localhost:3001/sign-up", params)
      .then((res) => {
        if (res.data.success === true) {
          console.log("PRIMER SUCCESS");
          let newUser = res.data.user;
          axios.post("http://localhost:3001/auth", newUser).then((res) => {
            if (res.data.success === true) {
              console.log("SEGUNDO SUCCESS");
              let session = JSON.stringify(res.data.session);
              localStorage.setItem("session", session);
              window.location.reload();
            }
          });
        } else {
          this.setState({
            errors: { message: res.data.message },
          });
        }
      })
      .catch((err) => {
        console.log("Sign up data submit error: ", err);
      });
    // TO CHANGE WITH SERVER DETAILS
  }

  validateForm(event) {
    event.preventDefault();
    var payload = validateSignUpForm(this.state.user);
    if (payload.success) {
      this.setState({
        errors: {},
      });
      var user = {
        username: this.state.user.username,
        password: this.state.user.password,
        email: this.state.user.email,
      };
      this.submitSignup(user);
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
        <SignUpForm
          onSubmit={this.validateForm}
          onChange={this.handleChange}
          onPwChange={this.pwHandleChange}
          errors={this.state.errors}
          user={this.state.user}
          score={this.state.score}
          btnTxt={this.state.btnTxt}
          type={this.state.type}
          pwMask={this.pwMask}
        />
      </div>
    );
  }
}

export default SignUp;
