import React, { useEffect, useState } from "react";
import "../../styles/modal-show.css";

import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Button,
} from "@mui/material";

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
        if (res.data.success === true) {
          setCredentials(res.data.results);
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
        <Card className="modal">
          <CardActions>
            <IconButton
              onClick={() => {
                setDisplay(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </CardActions>
          <CardContent className="modal-content">
            <h2 className="name">{name}</h2>

            <a href={`https://${url}`} target="_blank">
              <h3>{url}</h3>
            </a>

            <div
              className="credentials"
              onClick={() => {
                navigator.clipboard.writeText(username);
              }}
            >
              {username}
            </div>
            <div
              className="credentials"
              onClick={() => {
                navigator.clipboard.writeText(password);
              }}
            >
              {password}
            </div>
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
