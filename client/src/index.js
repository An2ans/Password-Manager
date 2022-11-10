import React, { Component } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import SignUp from "./components/sign-up/SignUp";
import LogIn from "./components/log-in/LogIn";

// Material ui for front-end
// ADD User funtionallity with restriction
// delete credentials by id
// usersdb
// DELETE EMAIL FIELD FROM LOGIN

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
        </div>

        <Routes>
          <Route exact path="/" element={<SignUp />}></Route>
          <Route exact path="/sign-up" element={<SignUp />}></Route>
          <Route exact path="/log-in" element={<LogIn />}></Route>
        </Routes>
      </Router>
    );
  }
}

// Create a root.
const root = ReactDOM.createRoot(document.getElementById("root"));

// Initial render
root.render(<App name="Saeloun blog" />);
