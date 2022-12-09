import React, { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function Comments() {
  const [showComment, setShowComment] = useState(false);

  const toggleShowComment = () => {
    setShowComment((prev) => !prev);
  };

  return (
    <>
      <Button
        variant="text"
        size="small"
        onClick={toggleShowComment}
        sx={{ mb: 2 }}
      >
        Add Comment
      </Button>
      {showComment && (
        <Grid container spacing={1}>
          <Grid item xs={12} lg={8}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              sx={{ width: "100%" }}
            />
            <Typography
              component="span"
              variant="caption"
              color="text.secondary"
            >
              Use comments to ask for more information or suggest improvements.
              Avoid answering questions in comments.
            </Typography>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Button variant="contained">Add Comment</Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}
