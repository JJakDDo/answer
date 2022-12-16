import React, { useState, useEffect } from "react";
import Parser from "html-react-parser";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useDeleteQuestion, useGetQuestions } from "../../hooks/questions";
import { convertDateToText } from "../../utils/convertDateToText";

import answers from "./mockData.json";
import Comments from "../Comments";
import {
  useAcceptAnswer,
  useDeleteAnswer,
  useGetAnswers,
} from "../../hooks/answers";
import useStore from "../../store/store";

export default function Answers({ id, isWriter, accepted_answer_id, refetch }) {
  // const { data: questions } = useGetQuestions();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(null);
  const username = useStore((state) => state.username);
  const [open, setOpen] = useState(false);
  const accessToken = useStore((state) => state.accessToken);
  const [deleteId, setDeleteId] = useState("");
  const { data: answerResponse } = useGetAnswers("default", id);

  const onDeleteSuccess = () => {
    // navigate(`/questions/${id}`);
    refetch();
    handleClose();
  };
  const onAcceptSuccess = () => {
    // navigate(`/questions/${id}`);
    refetch();
  };

  const { mutate: deleteAnswer } = useDeleteAnswer(onDeleteSuccess);
  const { mutate: acceptAnswer } = useAcceptAnswer(onAcceptSuccess);

  const handleClickOpen = (answer_id) => {
    setOpen(true);
    setDeleteId(answer_id);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    deleteAnswer({ accessToken, id: deleteId });
  };

  const handleAccept = (answer_id) => {
    acceptAnswer({ accessToken, question_id: id, answer_id });
  };

  useEffect(() => {
    if (answerResponse) {
      setAnswers(answerResponse.data.data);
    }
  }, [answerResponse]);

  if (!answers || answers.count === 0) return null;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography component="span" variant="h6" color="text.primary">
          {answers.count} Answers
        </Typography>
        <ButtonGroup
          variant="outlined"
          size="small"
          aria-label="outlined button group"
        >
          <Button>Score</Button>
          <Button>Newest</Button>
        </ButtonGroup>
      </Box>
      <Paper sx={{ padding: "20px 20px" }}>
        <List>
          {answers.list.map((answer, index) => (
            <React.Fragment key={answer.id}>
              {index !== 0 && (
                <Divider variant="fullWidth" sx={{ marginBottom: "20px" }} />
              )}
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar src={answer.user_info.avatar} />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box>
                      <h4 style={{ margin: 0, textAlign: "left" }}>
                        {answer.user_info.display_name}
                      </h4>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        answered {convertDateToText(answer.create_time)}
                      </Typography>
                    </Box>
                    {isWriter && (
                      <Button
                        variant={
                          accepted_answer_id === answer.id
                            ? "contained"
                            : "outlined"
                        }
                        size="small"
                        onClick={() =>
                          handleAccept(
                            accepted_answer_id === answer.id ? "0" : answer.id
                          )
                        }
                      >
                        {accepted_answer_id === answer.id
                          ? `Accepted`
                          : `Accept`}
                      </Button>
                    )}
                  </Box>
                  <p style={{ textAlign: "left" }}>{Parser(answer.html)}</p>
                  <Comments />
                </Grid>
                <Grid sx={{ textAlign: "right" }} item xs zeroMinWidth>
                  <ButtonGroup variant="text" size="small">
                    <Button sx={{ borderRight: "none !important" }}>
                      Share
                    </Button>
                    <Button sx={{ borderRight: "none !important" }}>
                      Flag
                    </Button>
                    {answer.user_info.username === username && (
                      <>
                        <Button sx={{ borderRight: "none !important" }}>
                          Edit
                        </Button>
                        <Button onClick={() => handleClickOpen(answer.id)}>
                          Delete
                        </Button>
                      </>
                    )}
                  </ButtonGroup>
                </Grid>
              </Grid>
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete this post"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you wish to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
