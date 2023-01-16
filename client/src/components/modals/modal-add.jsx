import React, { useState } from "react";
import "../../styles/modal-add.css";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/AddOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Button, TextField, IconButton } from "@mui/material/";
import { validateCredentials } from "../../utils/validators";
import PassGenerator from "../other/PassGenerator";
import PasswordStr from "../other/PasswordStr";

const zxcvbn = require("zxcvbn");

const ModalAdd = ({ userId, addNewCredentials }) => {
  const [display, setDisplay] = useState(false);
  const [errors, setErrors] = useState({});

  const defaultState = {
    name: "",
    url: "www.",
    username: "",
    password: "",
  };

  const [newCredentials, setNewCredentials] = useState(defaultState);

  const [btnTxt, setBtnTxt] = useState("show");

  const [score, setScore] = useState(0);

  const pwMask = (e) => {
    e.preventDefault();
    if (btnTxt === "show") {
      setBtnTxt("hide");
    } else {
      setBtnTxt("show");
    }
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setNewCredentials((others) => {
      return { ...others, [name]: value };
    });

    if (name === "password" && value != "") {
      var pw = zxcvbn(value);

      setScore(pw.score + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var payload = validateCredentials(newCredentials);
    if (payload.success) {
      setErrors({});
      addNewCredentials(newCredentials, userId);
      setDisplay(false);
      setNewCredentials(defaultState);
      setScore(0);
    } else {
      setErrors(payload.errors);
    }
  };

  const createPassword = (n, s) => {
    let chars =
      "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789";
    if (s) chars += "!#$%&()*+,-./:;<=>?@[]^_`{|}~";

    let password = "";
    for (let i = 0; i < n; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    //Checking the password contains at least a capital letter and a number
    if (!/[A-Z]/.test(password)) {
      password = password.slice(0, n - 2) + "A" + password.slice(n - 2);
    }
    if (!/\d/.test(password)) {
      password = password.slice(0, n - 1) + "1";
    }

    setNewCredentials((others) => {
      return { ...others, password: password };
    });

    var pw = zxcvbn(password);

    setScore(pw.score + 1);
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
            error={errors.name && true}
            helperText={errors.name}
            className="input"
            name="name"
            label="Name your new credentials"
            value={newCredentials.name}
            onChange={handleChange}
          />

          <TextField
            error={errors.url && true}
            className="input"
            name="url"
            label="The website URL"
            value={newCredentials.url}
            onChange={handleChange}
            helperText={errors.url}
          />

          <TextField
            error={errors.username && true}
            className="input"
            name="username"
            label="Your username"
            value={newCredentials.username}
            onChange={handleChange}
            helperText={errors.username}
          />

          <TextField
            error={errors.password && true}
            className="input"
            name="password"
            type={btnTxt === "show" ? "password" : "text"}
            label="Your password"
            value={newCredentials.password}
            onChange={handleChange}
            helperText={errors.password}
          />

          <Button
            className="btn-showPass "
            variant="text"
            onClick={pwMask}
            endIcon={
              btnTxt === "show" ? (
                <VisibilityOutlinedIcon />
              ) : (
                <VisibilityOffOutlinedIcon />
              )
            }
            sx={{ position: "absolute", right: "12%", top: "47%" }}
          >
            {btnTxt}
          </Button>

          <div className="bottom">
            <div className="pwStrRow">
              {score >= 1 && <PasswordStr score={score} />}
            </div>

            <PassGenerator createPassword={createPassword} />
          </div>

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
          fontSize: "1.2rem",
          height: "fit-content",
          alignSelf: "flex-end",
          marginLeft: "2rem",
        }}
      >
        Add
      </Button>
    );
  }
};

export default ModalAdd;
