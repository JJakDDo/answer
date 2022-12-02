import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import { useGetQuestions } from "../../hooks/questions";

import questions from "./mockData.json";

export default function QuestionList() {
  // const { data: questions } = useGetQuestions();
  console.log(questions);
  return (
    <List sx={{ width: "100%", maxWidth: 560, bgcolor: "background.paper" }}>
      {questions.map((question) => (
        <>
          <ListItem alignItems="flex-start">
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="h6"
              color="text.primary"
            >
              {question.title}
            </Typography>
          </ListItem>
          <Box>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.secondary"
            >
              {question.user_info.display_name}
            </Typography>
          </Box>
          <Divider component="li" />
        </>
      ))}
    </List>
  );
}
