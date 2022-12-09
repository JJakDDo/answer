import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useGetTags } from "../../hooks/tags";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "20px 20px 20px 20px",
  height: "70%",
}));

export default function QuestionList() {
  // const { data: questions } = useGetQuestions();
  const [order, setOrder] = useState("popular");
  const [tags, setTags] = useState(null);
  const { data: tagResponse } = useGetTags(order);

  const changeOrder = (newOrder) => {
    setOrder(newOrder);
  };

  useEffect(() => {
    if (tagResponse) {
      setTags(tagResponse.data.data);
    }
  }, [tagResponse]);

  if (!tags) return null;

  return (
    <Box sx={{ width: "90%", maxWidth: "1100px", minWidth: "450px" }}>
      <Typography component="span" variant="h4" color="text.primary">
        Tags
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
          mb: 2,
        }}
      >
        <TextField
          id="outlined-basic"
          label="Filter by tag name"
          variant="outlined"
          size="small"
        />
        <ButtonGroup
          variant="outlined"
          size="small"
          aria-label="outlined button group"
        >
          <Button
            variant={order === "popular" ? "contained" : "outlined"}
            onClick={() => changeOrder("popular")}
          >
            Popular
          </Button>
          <Button
            variant={order === "name" ? "contained" : "outlined"}
            onClick={() => changeOrder("name")}
          >
            Name
          </Button>
          <Button
            variant={order === "newest" ? "contained" : "outlined"}
            onClick={() => changeOrder("newest")}
          >
            Newest
          </Button>
        </ButtonGroup>
      </Box>
      <Grid container spacing={2} sx={{ alignItems: "stretch" }}>
        {tags.list.map((tag) => (
          <Grid key={tag.id} item xs={12} sm={6} md={4} lg={3}>
            <Item>
              <Chip label={tag.slug_name} size="small" color="primary" />
              {tag.original_text ? (
                <Typography
                  sx={{ display: "inline", pt: 2, pb: 2 }}
                  component="span"
                  variant="subtitle2"
                  color="text.primary"
                >
                  {tag.original_text}
                </Typography>
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "20px",
                    display: "inline",
                    pt: 2,
                    pb: 2,
                  }}
                />
              )}
              <Box>
                <Button variant="outlined" size="small">
                  Follow
                </Button>
                <Typography
                  sx={{ display: "inline", pl: 1 }}
                  component="span"
                  variant="body2"
                  color="text.secondary"
                >
                  {tag.question_count} questions
                </Typography>
              </Box>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
