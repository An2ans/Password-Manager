import React, { useEffect, useState } from "react";
// import { editCredentialsById, getCredentialsById } from "../utils/utils";
import "../../styles/modal-edit.css";

import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";

const ModalEdit = (props) => {
  const [display, setDisplay] = useState(false);

  const [{ id, name, url, username, password }, setCredentials] = useState({
    id: props.id,
    name: props.name,
    url: props.url,
  });

  useEffect(() => {
    getCredentialsById(id).then((response) => {
      let { username, password } = response.data[0];
      setCredentials((others) => {
        return { ...others, username, password };
      });
    });
  }, [display]);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCredentials((others) => {
      return { ...others, [name]: value };
    });
  };

  const handleSubmit = () => {
    try {
      editCredentialsById({
        id,
        newName: name,
        newUrl: url,
        newUsername: username,
        newPassword: password,
      });
    } catch (err) {
      console.log(err);
    }
    setDisplay(false);
  };

  if (display) {
    return (
      <div className="modal">
        <span className="close-btn" onClick={() => setDisplay(false)}>
          &times;
        </span>
        <div className="form">
          <input type="text" name="name" value={name} onChange={handleChange} />
          <input type="text" name="url" value={url} onChange={handleChange} />
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
          <input
            type="text"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <button className="submit" onClick={handleSubmit}>
            Save
          </button>
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
        startIcon={<EditIcon />}
      >
        Edit
      </Button>
    );
  }
};

export default ModalEdit;
