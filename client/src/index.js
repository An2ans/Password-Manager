import React, { Component, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Navigate } from "react-router-dom";

import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import SignUp from "./components/sign-up/SignUp";
import LogIn from "./components/log-in/LogIn";
import Manager from "./components/manager/Manager";
import Welcome from "./components/welcome/Welcome";

// Material ui for front-end
// ADD User funtionallity with restriction
// delete credentials by id
// usersdb

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      session: null,
      isLoggedIn: false,
    };
    this.getSession = this.getSession.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  getSession() {
    const session = JSON.parse(localStorage.getItem("session"));
    if (session) {
      this.setState({ session: session, isLoggedIn: true });
    } else {
      this.setState({ session: null, isLoggedIn: false });
    }
  }

  logOut() {
    localStorage.clear();
    console.log("logged out");
    window.location.reload();
  }

  componentDidMount() {
    this.getSession();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar user={this.state.session} logOut={this.logOut} />
        </div>

        <Routes>
          <Route
            exact
            path="/"
            element={this.state.isLoggedIn ? <Manager /> : <Welcome />}
          ></Route>
          <Route
            exact
            path="/sign-up"
            element={
              this.state.isLoggedIn ? <Navigate replace to="/" /> : <SignUp />
            }
          ></Route>
          <Route
            exact
            path="/log-in"
            element={
              this.state.isLoggedIn ? <Navigate replace to="/" /> : <LogIn />
            }
          ></Route>
          <Route
            exact
            path="/log-out"
            element={<Navigate replace to="/" />}
          ></Route>
        </Routes>
      </Router>
    );
  }
}

// Create a root.
const root = ReactDOM.createRoot(document.getElementById("root"));

// Initial render
root.render(<App />);
