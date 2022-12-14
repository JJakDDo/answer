import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { formHelperTextClasses } from "@mui/material";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

export default function NewTag({ open, handleClose, addNewTag }) {
  const displayNameRef = useRef(null);
  const urlSlugRef = useRef(null);
  const descriptionRef = useRef(null);

  const [displayNameEmpty, setDisplayNameEmpty] = useState(false);
  const [urlSlugEmpty, setUrlSlugEmpty] = useState(false);

  const handleSubmit = () => {
    if (!displayNameRef.current.value) {
      setDisplayNameEmpty(true);
    } else {
      setDisplayNameEmpty(false);
    }
    if (!urlSlugRef.current.value) {
      setUrlSlugEmpty(true);
    } else {
      setUrlSlugEmpty(false);
    }
    if (!displayNameRef.current.value || !urlSlugRef.current.value) {
      return;
    }

    addNewTag({
      display_name: displayNameRef.current.value,
      slug_name: urlSlugRef.current.value,
      original_text: descriptionRef.current.value,
      parsed_text: descriptionRef.current.value,
    });

    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Create new tag
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Display Name
        </Typography>
        <TextField variant="outlined" size="small" inputRef={displayNameRef} />
        {displayNameEmpty && (
          <Typography variant="subtitle2">
            Display name cannot be empty.
          </Typography>
        )}
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          URL Slug
        </Typography>
        <TextField variant="outlined" size="small" inputRef={urlSlugRef} />
        {urlSlugEmpty && (
          <Typography variant="subtitle2">URL Slug cannot be empty.</Typography>
        )}
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Description (Optional)
        </Typography>
        <TextField variant="outlined" size="small" inputRef={descriptionRef} />
        <Button
          variant="contained"
          sx={{ mt: 2, alignSelf: "center" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
}
