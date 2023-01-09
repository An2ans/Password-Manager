import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

const ModalAlert = ({ category, message }) => {
  const [open, setOpen] = React.useState(true);

  const timer = 30000;

  React.useEffect(() => {
    if (!category) {
      category = "info";
    }
    if (open) {
      setTimeout(() => {
        setOpen(false);
      }, timer);
    }
  }, [category, open]);

  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          severity={category}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
};

export default ModalAlert;
