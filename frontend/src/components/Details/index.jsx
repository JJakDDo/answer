import React, { useState, useEffect, useRef } from "react";
import Parser from "html-react-parser";
import { Link, useParams, useNavigate } from "react-router-dom";
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

import {
  useDeleteQuestion,
  useGetQuestions,
  useGetSingleQuestion,
} from "../../hooks/questions";
import { convertDateToText } from "../../utils/convertDateToText";

// import questions from "../QuestionList/mockData.json";
import Answers from "../Answers";
import Comments from "../Comments";
import { useAddAnswer } from "../../hooks/answers";
import useStore from "../../store/store";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Details() {
  // const { data: questions } = useGetQuestions();
  const navigate = useNavigate();
  const { id } = useParams();
  const accessToken = useStore((state) => state.accessToken);
  const username = useStore((state) => state.username);
  const [question, setQuestion] = useState(null);
  const { data: questionResponse } = useGetSingleQuestion(id);
  const [showEditor, setShowEditor] = useState(false);
  const answerRef = useRef(null);
  const [open, setOpen] = useState(false);

  const onDeleteSuccess = () => {
    navigate("/");
  };
  const { mutate: deleteQuestion } = useDeleteQuestion(onDeleteSuccess);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    deleteQuestion({ accessToken, id });
  };
  const onAddAnswerSuccess = (data) => {
    navigate(`/questions/${data.data.data.question.id}`);
  };
  const { mutate: addAnswer } = useAddAnswer(onAddAnswerSuccess);

  const handlePostAnswer = () => {
    if (answerRef.current) {
      addAnswer({
        accessToken,
        body: {
          content: answerRef.current.value,
          html: answerRef.current.value,
          question_id: id,
        },
      });
    }
  };

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
            {username === question.user_info.username && (
              <>
                <Button sx={{ borderRight: "none !important" }}>Edit</Button>
                <Button sx={{ borderRight: "none !important" }}>Close</Button>
                <Button onClick={handleClickOpen}>Delete</Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Delete this post"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure you wish to delete?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleDelete(question.id)} autoFocus>
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            )}
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
            <ReactQuill
              style={{ marginTop: "10px", marginBottom: "10px" }}
              ref={(element) => {
                if (element !== null) answerRef.current = element;
              }}
            />
            <Button variant="contained" size="small" onClick={handlePostAnswer}>
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
