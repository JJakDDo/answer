import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useGetQuestions } from "../../hooks/questions";

import questions from "./mockData.json";

const MONTH_MAP = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

function getStatusText(status) {
  return status !== "0" ? "answered" : "asked";
}

function convertDateToText(timestamp) {
  const date = new Date(timestamp * 1000);
  return `${MONTH_MAP[date.getMonth()]} ${date.getDate()}`;
}

export default function QuestionList() {
  // const { data: questions } = useGetQuestions();
  console.log(questions);
  return (
    <List sx={{ width: "100%", maxWidth: 560, bgcolor: "background.paper" }}>
      {questions.map((question) => (
        <React.Fragment key={question.id}>
          <ListItem alignItems="flex-start" sx={{ pl: 0 }}>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="h6"
              color="text.primary"
            >
              {question.title}
            </Typography>
          </ListItem>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body1"
              color="text.secondary"
            >
              {question.user_info.display_name}
            </Typography>
            <Typography
              sx={{ display: "inline", pl: 1 }}
              component="span"
              variant="body1"
              color="text.secondary"
            >
              •
            </Typography>
            <Typography
              sx={{ display: "inline", pl: 1 }}
              component="span"
              variant="body1"
              color="text.secondary"
            >
              {getStatusText(question.accepted_answer_id)}
            </Typography>
            <Typography
              sx={{ display: "inline", pl: 1 }}
              component="span"
              variant="body1"
              color="text.secondary"
            >
              {convertDateToText(question.create_time)}
            </Typography>
            <Typography
              sx={{ display: "inline", pl: 3 }}
              component="span"
              variant="body1"
              color="text.secondary"
            >
              <ThumbUpIcon fontSize="inherit" /> {question.vote_count}
            </Typography>
            <Typography
              sx={{ display: "inline", pl: 1 }}
              component="span"
              variant="body1"
              color="text.secondary"
            >
              {question.accepted_answer_id === "0" ? (
                <CommentIcon fontSize="inherit" />
              ) : (
                <CheckCircleIcon fontSize="inherit" color="success" />
              )}{" "}
              {question.answer_count}
            </Typography>
            <Typography
              sx={{ display: "inline", pl: 1 }}
              component="span"
              variant="body1"
              color="text.secondary"
            >
              <VisibilityIcon fontSize="inherit" /> {question.view_count}
            </Typography>
          </Box>
          <Box sx={{ mt: 2, mb: 2, display: "flex", gap: 1 }}>
            {question.tags.map((tag, index) => (
              <Chip key={index} label={tag.slug_name} color="primary" />
            ))}
          </Box>
          <Divider component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}
