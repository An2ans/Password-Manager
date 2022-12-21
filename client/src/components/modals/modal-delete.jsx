import React, { useEffect, useState } from "react";
import "../../styles/modal-show.css";

import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";

import axios from "axios";
import { Card, CardActions, CardContent } from "@mui/material";

const ModalDelete = (props) => {
  const { userId, credId, name, url } = props;

  // States
  const [display, setDisplay] = useState(false);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3001/credentials/${userId}/${credId}`)
      .then((res) => {
        if (res.data.success === true) {
          console.log("Credentials deleted");
          setDisplay(false);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
            <p className="delete-message">
              We cannot recover your credentials once deleted. Are you sure you
              wish to delete this credential? Name: {name}, Web: {url}
            </p>
          </CardContent>
          <CardActions>
            <Button variant="contained" onClick={handleDelete}>
              Delete
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  } else {
    return (
      <Button
        variant="contained"
        startIcon={<VisibilityIcon />}
        onClick={() => {
          setDisplay(true);
        }}
      >
        Delete
      </Button>
    );
  }
};

export default ModalDelete;
