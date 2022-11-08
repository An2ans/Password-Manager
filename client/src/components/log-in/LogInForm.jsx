import React from "react";
import { TextField, Button } from "@mui/material/";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import "./styles.css";

const LogInForm = ({
  history,
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
      {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

      <form onSubmit={onSubmit}>
        <TextField
          error={errors.username && true}
          name="username"
          label="User name"
          value={user.username}
          onChange={onChange}
          helperText={errors.username}
        />
        <TextField
          error={errors.email && true}
          name="email"
          label="Email"
          value={user.email}
          onChange={onChange}
          helperText={errors.email}
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
