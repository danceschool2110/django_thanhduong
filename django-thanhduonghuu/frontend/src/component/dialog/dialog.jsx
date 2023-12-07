import { Box, Button, Dialog as MuiDialog, Stack, Zoom } from "@mui/material";
import React from "react";

const Dialog = ({ open, onClose, children, onSubmit }) => {
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      TransitionComponent={Zoom}
      PaperProps={{
        sx: {
          width: 500,
          maxWidth: "none",
          padding: "30px",
        },
      }}
    >
      <Box
        component="form"
        autoComplete="off"
        sx={{
          "& .MuiTextField-root": {
            maxWidth: "100%",
          },
        }}
        onSubmit={onSubmit}
      >
        {children}
        <Stack
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          gap={2}
          mt={2}
        >
          <Button color="inherit" variant="contained" onClick={onClose}>
            Cancel
          </Button>
          <Button color="primary" type="submit" variant="contained">
            Update
          </Button>
        </Stack>
      </Box>
    </MuiDialog>
  );
};

export default Dialog;
