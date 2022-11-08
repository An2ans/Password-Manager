import React from "react";
import { TextField, Button } from "@mui/material/";
import PasswordStr from "../other/PasswordStr";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import "./styles.css";

const SignUpForm = ({
  history,
  onSubmit,
  onChange,
  errors,
  user,
  score,
  btnTxt,
  type,
  pwMask,
  onPwChange,
}) => {
  return (
    <div className="loginBox">
      <h1>Sign Up</h1>
      {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

      <form onSubmit={onSubmit}>
        <TextField
          name="username"
          label="user name"
          value={user.username}
          onChange={onChange}
          helperText={errors.username}
        />
        <TextField
          name="email"
          label="email"
          value={user.email}
          onChange={onChange}
          helperText={errors.email}
        />
        <TextField
          type={type}
          name="password"
          label="password"
          value={user.password}
          onChange={onPwChange}
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

        <div className="pwStrRow">
          {score >= 1 && <PasswordStr score={score} />}
        </div>
        <TextField
          type={type}
          name="pwconfirm"
          label="confirm password"
          value={user.pwconfirm}
          onChange={onChange}
          helperText={errors.pwconfirm}
        />
        <br />
        <Button className="signUpSubmit " type="submit" label="submit" />
      </form>
      <p>
        Aleady have an account? <br />
        <a href="/log-in">Log in here</a>
      </p>
    </div>
  );
};

export default SignUpForm;
