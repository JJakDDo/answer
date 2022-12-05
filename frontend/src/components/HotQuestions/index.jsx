import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import WifiIcon from "@mui/icons-material/Wifi";
import BluetoothIcon from "@mui/icons-material/Bluetooth";
import CommentIcon from "@mui/icons-material/Comment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import questions from "./mockData.json";

export default function HotQuestions() {
  const [checked, setChecked] = React.useState(["wifi"]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      subheader={<ListSubheader>Hot Questions</ListSubheader>}
    >
      {questions.map((question) => {
        return (
          <ListItem key={question.id}>
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
                        sx={{ display: "inline" }}
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
