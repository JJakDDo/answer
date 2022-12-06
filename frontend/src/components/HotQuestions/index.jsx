import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Typography from "@mui/material/Typography";
import CommentIcon from "@mui/icons-material/Comment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import questions from "./mockData.json";

export default function HotQuestions() {
  const [hotQuestions, setHotQuestions] = useState([]);

  useEffect(() => {
    setHotQuestions(questions.sort((a, b) => b.view_count - a.view_count));
  }, [questions]);

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#bcbcbc",
        borderRadius: "10px",
      }}
      subheader={
        <ListSubheader
          sx={{
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            backgroundColor: "#efeded",
          }}
        >
          Hot Questions
        </ListSubheader>
      }
    >
      {hotQuestions.map((question) => {
        return (
          <ListItem
            key={question.id}
            sx={{
              borderWidth: "1px 0 0 0",
              borderStyle: "solid",
              borderColor: "#bcbcbc",
            }}
          >
            <ListItemText
              primary={question.title}
              secondary={
                <React.Fragment>
                  {question.answer_count > 0 && (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        sx={{ display: "flex" }}
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        {question.accepted_answer_id === "0" ? (
                          <CommentIcon fontSize="inherit" />
                        ) : (
                          <CheckCircleIcon fontSize="inherit" color="success" />
                        )}
                      </Typography>
                      <Typography
                        sx={{ display: "inline", pl: 1 }}
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        {question.answer_count} answers
                      </Typography>
                    </Box>
                  )}
                </React.Fragment>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
}
