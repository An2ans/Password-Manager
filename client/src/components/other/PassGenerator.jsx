import react from "react";
import { Button } from "@mui/material";

const PassGenerator = ({ createPassword }) => {
  //This function will create the password of n characters. I will implement a way to select n and s values from front-end in the future.

  const handleClick = (e) => {
    e.preventDefault();
    // const input = document.getElementById("password");
    const password = createPassword(12, true);
  };

  return (
    <div className="generator-container">
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleClick}
        sx={{ marginTop: "2rem " }}
      >
        Generate Password
      </Button>
    </div>
  );
};

export default PassGenerator;
