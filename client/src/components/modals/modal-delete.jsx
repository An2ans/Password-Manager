import React, { useState } from "react";
import "../../styles/modal-delete.css";

import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Button,
} from "@mui/material";

const ModalDelete = (props) => {
  const { userId, credId, name, url, deleteCredentials } = props;

  // States
  const [display, setDisplay] = useState(false);

  const handleDelete = () => {
    deleteCredentials(userId, credId);
    setDisplay(false);
    window.location.reload();
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
          <CardContent>
            <p className="delete-message">
              We cannot recover your credentials once deleted. Are you sure you
              wish to delete this credential?
              <br />
              <br /> Name: {name}
              <br /> Web: {url}
            </p>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              sx={{ width: "100%" }}
            >
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
        color="error"
        startIcon={<DeleteForeverIcon />}
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
