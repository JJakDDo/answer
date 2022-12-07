import React, { useState, useEffect } from "react";
import Parser from "html-react-parser";
import { Link, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import TextField from "@mui/material/TextField";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useGetQuestions } from "../../hooks/questions";
import { convertDateToText } from "../../utils/convertDateToText";

import questions from "../QuestionList/mockData.json";
import Answers from "../Answers";

export default function Details() {
  // const { data: questions } = useGetQuestions();
  const { id } = useParams();
  const [question, setQuestion] = useState(
    questions.find((question) => question.id === id)
  );
  const [showComment, setShowComment] = useState(false);

  const toggleShowComment = () => {
    setShowComment((prev) => !prev);
  };

  console.log(question);
  return (
    <Box>
      <Typography component="span" variant="h5" color="text.primary">
        {question.title}
      </Typography>
      <Box
        sx={{
          mt: 2,
          mb: 2,
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Typography component="span" variant="body2" color="text.secondary">
          Asked {convertDateToText(question.create_time)}
        </Typography>
        <Typography component="span" variant="body2" color="text.secondary">
          Modified {convertDateToText(question.update_time)}
        </Typography>
        <Typography component="span" variant="body2" color="text.secondary">
          Viewed {question.view_count}
        </Typography>
        <Button variant="text" size="small">
          Follow
        </Button>
      </Box>
      <Box
        sx={{
          mt: 2,
          mb: 2,
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        {question.tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag.slug_name}
            size="small"
            color="primary"
          />
        ))}
      </Box>
      <Box
        sx={{
          mt: 2,
          mb: 2,
        }}
      >
        {Parser(question.html)}
      </Box>
      <Box
        sx={{
          mt: 2,
          mb: 2,
        }}
      >
        <IconButton aria-label="delete" size="small">
          <ThumbUpIcon fontSize="inherit" />
        </IconButton>
        <Typography component="span" variant="body2" color="text.secondary">
          {question.vote_count}
        </Typography>
        <IconButton aria-label="delete" size="small">
          <ThumbDownIcon fontSize="inherit" />
        </IconButton>
        <Button
          variant="outlined"
          startIcon={<BookmarkIcon />}
          sx={{ ml: 2 }}
          size="small"
        >
          {question.collection_count}
        </Button>
      </Box>

      <Box
        sx={{
          mt: 2,
          mb: 2,
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}
      >
        <ButtonGroup variant="text" size="small">
          <Button sx={{ borderRight: "none !important" }}>Share</Button>
          <Button sx={{ borderRight: "none !important" }}>Flag</Button>
          <Button sx={{ borderRight: "none !important" }}>Edit</Button>
          <Button sx={{ borderRight: "none !important" }}>Close</Button>
          <Button>Delete</Button>
        </ButtonGroup>
        <Typography component="span" variant="body2" color="text.secondary">
          Edited {convertDateToText(question.edit_time)}
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 4,
          mb: 2,
        }}
      >
        <Button variant="text" size="small" onClick={toggleShowComment}>
          Add Comment
        </Button>
      </Box>
      {showComment && (
        <Grid container spacing={1}>
          <Grid item xs={12} lg={8}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              sx={{ width: "100%" }}
            />
            <Typography component="span" variant="body2" color="text.secondary">
              Use comments to ask for more information or suggest improvements.
              Avoid answering questions in comments.
            </Typography>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Button variant="contained">Add Comment</Button>
          </Grid>
        </Grid>
      )}

      <Box
        sx={{
          mt: 2,
          mb: 2,
        }}
      >
        <Answers />
      </Box>

      <Box
        sx={{
          mt: 2,
          mb: 2,
        }}
      >
        <Button variant="contained" size="small">
          Post your answer
        </Button>
      </Box>
    </Box>
  );
}
