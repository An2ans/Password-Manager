import React, { useState } from "react";
import "../../styles/modal-add.css";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/AddOutlined";
import { Button, TextField, IconButton } from "@mui/material/";

const ModalAdd = ({ userId, addNewCredentials }) => {
  const [display, setDisplay] = useState(false);

  const [newCredentials, setNewCredentials] = useState({
    name: "",
    url: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setNewCredentials((others) => {
      return { ...others, [name]: value };
    });
  };

  const handleSubmit = () => {
    addNewCredentials(newCredentials, userId);

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
      <div className="modal-add">
        <IconButton
          onClick={() => {
            setDisplay(false);
          }}
        >
          <CloseIcon />
        </IconButton>

        <h2>Add your new credentials: </h2>
        <form onSubmit={handleSubmit}>
          <TextField
            // error={errors.username && true}
            className="input"
            name="name"
            label="Name your new credentials"
            value={newCredentials.name}
            onChange={handleChange}
            // helperText={errors.username}
          />

          <TextField
            // error={errors.username && true}
            className="input"
            name="url"
            label="The website URL"
            value={newCredentials.url}
            onChange={handleChange}
            // helperText={errors.username}
          />

          <TextField
            // error={errors.username && true}
            className="input"
            name="username"
            label="Your username"
            value={newCredentials.username}
            onChange={handleChange}
            // helperText={errors.username}
          />

          <TextField
            // error={errors.username && true}
            className="input"
            name="password"
            label="Your password"
            value={newCredentials.password}
            onChange={handleChange}
            // helperText={errors.username}
          />

          <Button
            className="submit input"
            variant="contained"
            color="success"
            type="submit"
            label="Add"
            sx={{ margin: "2rem auto", fontSize: "1.5rem" }}
          >
            Add
          </Button>
        </form>
      </div>
    );
  } else {
    return (
      <Button
        onClick={() => setDisplay(true)}
        variant="contained"
        color="success"
        startIcon={<AddIcon />}
        sx={{
          borderRadius: "120px",
        }}
      >
        Add
      </Button>
    );
  }
};

export default ModalAdd;
