import React, { useState } from "react";
// import { addNewCredentials } from "../utils/utils";
import "../../styles/modal-add.css";

import AddIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";

const ModalAdd = (props) => {
  const [display, setDisplay] = useState(false);

  const [newCredentials, setNewCredentials] = useState({
    name: "",
    url: "",
    username: "",
    password: "",
  });

  const handleChange = (e, rest) => {
    let name = e.target.name;
    let value = e.target.value;
    setNewCredentials((others) => {
      return { ...others, [name]: value };
    });
  };

  const handleSubmit = () => {
    addNewCredentials(newCredentials);
    setDisplay(false);
    setNewCredentials({
      name: "",
      url: "",
      username: "",
      password: "",
    });
  };

  if (display) {
    return (
      <div className="modal">
        <span className="close-btn" onClick={() => setDisplay(false)}>
          &times;
        </span>
        <div className="form">
          <input
            type="text"
            name="name"
            placeholder="Name your new credentials"
            onChange={handleChange}
          />
          <input
            type="text"
            name="url"
            placeholder="url"
            onChange={handleChange}
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />
          <input
            type="text"
            name="password"
            placeholder="Your Password"
            onChange={handleChange}
          />
          <button className="submit" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <Button
        onClick={() => setDisplay(true)}
        variant="contained"
        startIcon={<AddIcon />}
      >
        Add
      </Button>
    );
  }
};

export default ModalAdd;
