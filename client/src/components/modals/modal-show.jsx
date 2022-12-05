import React, { useEffect, useState } from "react";
// import { getCredentialsById } from "../utils/utils";
import "../../styles/modal-show.css";

import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ModalShow = ({ credId, credName, url }) => {
  // States
  const [display, setDisplay] = useState(false);
  const [{ username, password }, setCredentials] = useState({
    username: null,
    password: null,
  });

  const timer = 10000;

  const handleShow = (e) => {
    setDisplay(true);
    getCredentialsById(passId).then((response) => {
      setCredentials(response.data[0]);
    });

    setTimeout(() => {
      setCredentials({ username: null, password: null });
      setDisplay(false);
    }, timer);
  };

  const handleClose = (e) => {
    if (
      e.target.classList.contains("close-btn") ||
      e.target.classList.contains("modal-wrapper")
    ) {
      setDisplay(false);
    }
  };

  if (display) {
    return (
      <div className="modal-wrapper" onClick={handleClose}>
        <div className="modal">
          <div className="modal-header">
            <span className="close-btn" onClick={handleClose}>
              &times;
            </span>
            <h2>{passName}</h2>
            <a href="#">
              <h3>{passUrl}</h3>
            </a>
          </div>
          <div className="modal-content">
            <div className="user-container">
              <h3>Username:</h3>
              <span id="username">{username} </span>
            </div>
            <div className="pass-container">
              <h3>Password:</h3>
              <span id="password">{password} </span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Button
        variant="contained"
        startIcon={<VisibilityIcon />}
        onClick={handleShow}
      >
        Show
      </Button>
    );
  }
};

export default ModalShow;

{
  /* <div className="modal-show-btn" onClick={handleShow}>
SHOW
</div> */
}
