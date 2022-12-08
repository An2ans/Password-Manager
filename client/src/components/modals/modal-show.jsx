import React, { useEffect, useState } from "react";
import "../../styles/modal-show.css";

import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";

import axios from "axios";
import { Card, CardActions, CardContent } from "@mui/material";

const ModalShow = (props) => {
  const { userId, credId, name, url } = props;

  // States
  const [display, setDisplay] = useState(false);
  const [{ username, password }, setCredentials] = useState({
    username: null,
    password: null,
  });

  const timer = 10000;

  const showCredentials = (userId, credId) => {
    axios
      .get(`http://localhost:3001/credentials/${userId}/${credId}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.success === true) {
          setCredentials(res.data.results[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShow = (e) => {
    showCredentials(userId, credId);
    setDisplay(true);
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
        <Card>
          <CardActions>
            <span className="close-btn" onClick={handleClose}>
              &times;
            </span>
          </CardActions>
          <CardContent>
            <h2>{name}</h2>
            <a href="#">
              <h3>{url}</h3>
            </a>
            <br />
            <h3>Username: {username} </h3>
            <h3>Password: {password}</h3>
          </CardContent>
        </Card>
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
