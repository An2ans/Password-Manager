import React, { useState, useEffect } from "react";
import axios from "axios";

import "../../styles/modal-edit.css";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton, TextField } from "@mui/material/";
import { validateCredentials } from "../../utils/validators";

const ModalEdit = (props) => {
  const { userId, credId, name, url } = props;

  const [display, setDisplay] = useState(false);

  const [errors, setErrors] = useState({});

  const [credential, setCredentials] = useState({
    id: credId,
    name: name,
    url: url,
    username: null,
    password: null,
  });

  useEffect(() => {
    if (!credential.username || !credential.password) {
      axios
        .get(`http://localhost:3001/credentials/${userId}/${credId}`)
        .then((res) => {
          if (res.data.success) {
            let { username, password } = res.data.results;
            setCredentials((others) => {
              return { ...others, username, password };
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (!name || !url) {
      window.location.reload();
    }
  }, [display]);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCredentials((others) => {
      return { ...others, [name]: value };
    });
  };
  useEffect;

  const handleSubmit = (e) => {
    e.preventDefault();
    var payload = validateCredentials(credential);
    if (payload.success) {
      axios
        .put(
          `http://localhost:3001/credentials/${userId}/${credId}`,
          credential
        )
        .then((res) => {
          if (res.data.success === true) {
            setErrors({});
            setDisplay(false);
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setErrors(payload.errors);
    }
  };

  if (display) {
    return (
      <div className="modal-wrapper">
        <div className="modal">
          <IconButton
            onClick={() => {
              setDisplay(false);
            }}
          >
            <CloseIcon />
          </IconButton>

          <h2>Edit your credentials:</h2>

          <div className="form">
            <TextField
              className="input"
              name="name"
              value={credential.name}
              onChange={handleChange}
              label="Change the name"
              error={errors.name && true}
              helperText={errors.name}
            />
            <TextField
              className="input"
              name="url"
              value={credential.url}
              onChange={handleChange}
              label="Change the url"
              error={errors.url && true}
              helperText={errors.url}
            />
            <TextField
              className="input"
              name="username"
              value={credential.username}
              onChange={handleChange}
              label="Change the username"
              error={errors.username && true}
              helperText={errors.username}
            />
            <TextField
              className="input"
              name="password"
              value={credential.password}
              onChange={handleChange}
              label="Change the password"
              error={errors.password && true}
              helperText={errors.password}
            />
            <Button
              className="submit"
              onClick={handleSubmit}
              variant="contained"
              color="success"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Button
        onClick={() => {
          setDisplay(true);
        }}
        variant="contained"
        color="secondary"
        startIcon={<EditIcon />}
      >
        Edit
      </Button>
    );
  }
};

export default ModalEdit;
