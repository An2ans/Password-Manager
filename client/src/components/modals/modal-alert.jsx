import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

const ModalAlert = (props) => {
  const [open, setOpen] = React.useState(false);

  const { category, message } = props;

  const [info, setInfo] = React.useState({ category, message });

  const timer = 3000;

  React.useEffect(() => {
    if (!props.category) {
      info.category = "info";
    }
    if (info.message) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, timer);
    }

    if (props.message != info.message) {
      setInfo({ category: props.category, message: props.message });
      console.log("Message changed");
    }
  }, [props, info, open]);

  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open} timeout={500}>
        <Alert
          severity={info.category}
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
          {info.message}
        </Alert>
      </Collapse>
    </Box>
  );
};

export default ModalAlert;
