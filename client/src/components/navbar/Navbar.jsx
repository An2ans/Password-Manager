import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

const Navbar = (props) => {
  const user = props.user;

  const logOut = props.logOut;

  return (
    <nav className="navbar ">
      <div className="icon"></div>
      <ul className="options">
        <Link to="/">Manager </Link>
        {user == null ? (
          <Link to="/log-in">Log In </Link>
        ) : (
          <li>{user.username}</li>
        )}
        {user == null ? (
          <li>
            <Link to="/sign-up">Sign Up </Link>
          </li>
        ) : (
          <li>
            <Link
              to="/log-out"
              onClick={() => {
                logOut();
              }}
            >
              Log Out{" "}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
