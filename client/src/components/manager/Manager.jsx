import { Box } from "@mui/material";
import React, { Component, useEffect } from "react";
import { redirect } from "react-router-dom";

class Manager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: null,
    };
  }

  componentDidMount() {
    const session = JSON.parse(localStorage.getItem("session"));
    if (!session) {
      redirect("/log-in");
    } else {
      this.setState({ session: session });
    }
  }

  // updateUser() {
  //   useEffect(() => {
  //     const session = JSON.parse(localStorage.getItem("session"));
  //     console.log("session en manager", session);
  //     if (session) {
  //       this.setState({ user: session });
  //     } else {
  //       this.setState({ errors: { message: "no session found" } });
  //     }
  //   });
  // }

  render() {
    return (
      <Box textAlign="center">
        {/* <h1>USERNAME: {this.state.session.username || ""}</h1>
        <p>ID: {this.state.session.userId || ""}</p> */}
      </Box>
    );
  }
}

export default Manager;
