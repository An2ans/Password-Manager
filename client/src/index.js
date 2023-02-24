import React, { Component, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Navigate } from "react-router-dom";
import Markdown from "markdown-to-jsx";

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
import AdminTable from "./components/admin/admin";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      session: null,
      isLoggedIn: false,
      readme: "",
    };
    this.getSession = this.getSession.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  // Get the session item from local storage and save it in state
  getSession() {
    const session = JSON.parse(localStorage.getItem("session"));
    if (session) {
      this.setState({ session: session, isLoggedIn: true });
    } else {
      this.setState({ session: null, isLoggedIn: false });
    }
  }

  // clear local storage and state
  logOut() {
    localStorage.clear();
    this.setState({ session: null, isLoggedIn: false });
    console.log("logged out");
    window.location.reload();
  }

  // When component mount the app try to get the session from local storage and fetch the readme
  componentDidMount() {
    this.getSession();
    fetch(`${process.env.PUBLIC_URL}/README.md`)
      .then((response) => response.text())
      .then((text) => this.setState({ readme: text }))
      .catch((err) => {
        console.log(err);
        this.setState({ readme: "UNABLE TO FETCH THE README.md FILE" });
      });
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
          <Route
            exact
            path="/admin"
            element={this.state.isLoggedIn ? <AdminTable /> : <LogIn />}
          ></Route>

          <Route
            exact
            path="/readme"
            element={<Markdown children={this.state.readme} />}
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
