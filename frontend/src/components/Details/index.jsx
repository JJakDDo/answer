import React, { useState, useEffect } from "react";
import Parser from "html-react-parser";
import { Link, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Avatar from "@mui/material/Avatar";
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

import { useGetQuestions, useGetSingleQuestion } from "../../hooks/questions";
import { convertDateToText } from "../../utils/convertDateToText";

// import questions from "../QuestionList/mockData.json";
import Answers from "../Answers";
import Comments from "../Comments";

export default function Details() {
  // const { data: questions } = useGetQuestions();
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const { data: questionResponse } = useGetSingleQuestion(id);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    if (questionResponse) {
      setQuestion(questionResponse.data.data);
    }
  }, [questionResponse]);

  if (!question) return null;

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

      <Grid
        container
        sx={{
          mt: 2,
          mb: 2,
          gap: 10,
        }}
      >
        <Grid item xs={12} md={3}>
          <ButtonGroup variant="text" size="small">
            <Button sx={{ borderRight: "none !important" }}>Share</Button>
            <Button sx={{ borderRight: "none !important" }}>Flag</Button>
            <Button sx={{ borderRight: "none !important" }}>Edit</Button>
            <Button sx={{ borderRight: "none !important" }}>Close</Button>
            <Button>Delete</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography component="span" variant="body2" color="text.secondary">
            Edited {convertDateToText(question.edit_time)}
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar src={question.user_info.avatar} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box>
                  <h4 style={{ margin: 0, textAlign: "left" }}>
                    {question.user_info.display_name}
                  </h4>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    asked {convertDateToText(question.create_time)}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Comments />

      <Box
        sx={{
          mt: 2,
          mb: 2,
        }}
      >
        <Answers id={id} />
      </Box>

      <Box
        sx={{
          mt: 2,
          mb: 2,
        }}
      >
        {showEditor ? (
          <Box>
            <Typography component="span" variant="h6" color="text.primary">
              Your Answer
            </Typography>
            <ReactQuill style={{ marginTop: "10px", marginBottom: "10px" }} />
            <Button variant="contained" size="small">
              Post your answer
            </Button>
          </Box>
        ) : (
          <Button
            variant="contained"
            size="small"
            onClick={() => setShowEditor(true)}
          >
            Post your answer
          </Button>
        )}
      </Box>
    </Box>
  );
}
