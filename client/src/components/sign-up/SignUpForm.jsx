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
          onChange={onPwChange}
          helperText={errors.password}
        />

        <div className="pwStrShow">
          <div className="pwStrRow">
            {score >= 1 && <PasswordStr score={score} />}
          </div>

          <Button
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
        </div>

        <TextField
          error={errors.pwconfirm && true}
          type={type}
          name="pwconfirm"
          label="Confirm password"
          value={user.pwconfirm}
          onChange={onChange}
          helperText={errors.pwconfirm}
        />
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
        Aleady have an account? <br />
        <a href="/log-in">Log in here</a>
      </p>
    </div>
  );
};

export default SignUpForm;
