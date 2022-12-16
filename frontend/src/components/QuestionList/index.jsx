import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useGetQuestions } from "../../hooks/questions";
import { convertDateToText } from "../../utils/convertDateToText";
import { useEffect } from "react";

// import questions from "./mockData.json";

const MONTH_MAP = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getStatusText(status) {
  return status !== "0" ? "answered" : "asked";
}

export default function QuestionList() {
  const [order, setOrder] = useState("newest");
  const [list, setList] = useState([]);
  const { data: questions } = useGetQuestions(order);
  const changeOrder = (newOrder) => {
    if (order !== newOrder) {
      setOrder(newOrder);
    }
  };

  useEffect(() => {
    if (questions) {
      console.log(questions.data.data);
      setList(questions.data.data.list);
    }
  }, [questions]);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography component="span" variant="h6" color="text.primary">
          All Questions
        </Typography>
        <ButtonGroup
          variant="outlined"
          size="small"
          aria-label="outlined button group"
        >
          <Button
            variant={order === "newest" ? "contained" : "outlined"}
            onClick={() => changeOrder("newest")}
          >
            Newest
          </Button>
          <Button
            variant={order === "active" ? "contained" : "outlined"}
            onClick={() => changeOrder("active")}
          >
            Active
          </Button>
          <Button
            variant={order === "frequent" ? "contained" : "outlined"}
            onClick={() => changeOrder("frequent")}
          >
            Frequent
          </Button>
          <Button
            variant={order === "score" ? "contained" : "outlined"}
            onClick={() => changeOrder("score")}
          >
            Score
          </Button>
          <Button
            variant={order === "unanswered" ? "contained" : "outlined"}
            onClick={() => changeOrder("unanswered")}
          >
            Unanswered
          </Button>
        </ButtonGroup>
      </Box>
      <Divider />
      <List sx={{ bgcolor: "background.paper" }}>
        {list.map((question) => (
          <React.Fragment key={question.id}>
            <Link to={`/questions/${question.id}`}>
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
            </Link>
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
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{ display: "flex", pl: 3 }}
                  component="span"
                  variant="body1"
                  color="text.secondary"
                >
                  <ThumbUpIcon fontSize="inherit" />
                </Typography>
                <Typography
                  sx={{ display: "inline", pl: 0.5 }}
                  component="span"
                  variant="body1"
                  color="text.secondary"
                >
                  {question.vote_count}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{ display: "flex", pl: 1 }}
                  component="span"
                  variant="body1"
                  color="text.secondary"
                >
                  {question.accepted_answer_id === "0" ? (
                    <CommentIcon fontSize="inherit" />
                  ) : (
                    <CheckCircleIcon fontSize="inherit" color="success" />
                  )}
                </Typography>
                <Typography
                  sx={{ display: "inline", pl: 0.5 }}
                  component="span"
                  variant="body1"
                  color="text.secondary"
                >
                  {question.answer_count}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{ display: "flex", pl: 1 }}
                  component="span"
                  variant="body1"
                  color="text.secondary"
                >
                  <VisibilityIcon fontSize="inherit" />
                </Typography>
                <Typography
                  sx={{ display: "inline", pl: 0.5 }}
                  component="span"
                  variant="body1"
                  color="text.secondary"
                >
                  {question.view_count}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 2, mb: 2, display: "flex", gap: 1 }}>
              {question.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag.slug_name}
                  size="small"
                  color="primary"
                />
              ))}
            </Box>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
