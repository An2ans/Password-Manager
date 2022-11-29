import React from "react";

import "../../styles/welcome.css";

const Welcome = () => {
  return (
    <div className="welcome-page">
      <h1 className="title">
        Welcome to your <br />
        Password Manager
      </h1>
      <h2 className="instructions">
        Please, create a new account, or log in with with your credentials{" "}
      </h2>
    </div>
  );
};

export default Welcome;
