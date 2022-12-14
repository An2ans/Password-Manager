import React from "react";
import { TextField, Button } from "@mui/material/";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import ModalAlert from "../modals/modal-alert";

import "./styles.css";

const LogInForm = ({
  onSubmit,
  onChange,
  errors,
  user,
  btnTxt,
  type,
  pwMask,
}) => {
  return (
    <div className="loginBox">
      <h1>Log In</h1>
      {errors.message && (
        <ModalAlert category="error" message={errors.message}></ModalAlert>
      )}

      <form onSubmit={onSubmit} className="form">
        <TextField
          error={errors.username && true}
          name="username"
          label="User name"
          value={user.username}
          onChange={onChange}
          helperText={errors.username}
        />
        <TextField
          error={errors.password && true}
          type={type}
          name="password"
          label="Password"
          value={user.password}
          onChange={onChange}
          helperText={errors.password}
        />

        <Button
          className="pwShowHideBtn"
          variant="text"
          onClick={pwMask}
          endIcon={
            btnTxt === "show" ? (
              <VisibilityOutlinedIcon />
            ) : (
              <VisibilityOffOutlinedIcon />
            )
          }
        >
          {btnTxt}
        </Button>

        <Button
          className="signUpSubmit"
          variant="contained"
          type="submit"
          label="submit"
        >
          Submit
        </Button>
      </form>
      <p>
        Don't have an account yet? <br />
        <a href="/sign-up">Sign up here</a>
      </p>
    </div>
  );
};

export default LogInForm;
