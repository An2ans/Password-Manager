import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

const Navbar = (props) => {
  const [user, setUser] = useState(null);

  return (
    <nav className="navbar navbar-light">
      <div className="icon"></div>
      <ul className="options">
        <li>Manager</li>
        {user == null ? <li>Log In</li> : <li>${user}</li>}
        {user == null ? (
          <li>
            <Link to="/sign-up">Sign Up </Link>
          </li>
        ) : (
          <li>Settings</li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
