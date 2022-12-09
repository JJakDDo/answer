import React from "react";
import Parser from "html-react-parser";
import { Link } from "react-router-dom";
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

import { useGetQuestions } from "../../hooks/questions";
import { convertDateToText } from "../../utils/convertDateToText";

import answers from "./mockData.json";
import Comments from "../Comments";

export default function Answers() {
  // const { data: questions } = useGetQuestions();
  if (answers.count === 0) return null;

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
                    <Button variant="outlined" size="small">
                      Accept
                    </Button>
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
                    <Button sx={{ borderRight: "none !important" }}>
                      Edit
                    </Button>
                    <Button>Delete</Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
