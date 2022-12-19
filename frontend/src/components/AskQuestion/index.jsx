import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import tags from "./mockData.json";
import AddTag from "../AddTag";
import { useAddQuestion } from "../../hooks/questions";
import useStore from "../../store/store";
import { useAddAnswer } from "../../hooks/answers";

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

export default function AskQuestion() {
  const navigate = useNavigate();
  // const { data: questions } = useGetQuestions();
  const accessToken = useStore((state) => state.accessToken);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedTag, setSelectedTag] = useState([]);
  const [titleError, setTitleError] = useState(false);
  const [titleErrorMessage, setTitleErrorMessage] = useState("");
  const [bodyError, setBodyError] = useState(false);
  const titleRef = useRef(null);
  const questionRef = useRef(null);
  const answerRef = useRef(null);

  const onAddAnswerSuccess = (data) => {
    navigate(`/questions/${data.data.data.question.id}`);
  };
  const onAddAnswerError = (data) => {
    console.log(error);
  };
  const { mutate: addAnswer } = useAddAnswer(
    onAddAnswerSuccess,
    onAddAnswerError
  );
  const onSuccess = (data) => {
    if (answerRef.current) {
      addAnswer({
        accessToken,
        body: {
          content: answerRef.current.value,
          html: answerRef.current.value,
          question_id: data.data.data.id,
        },
      });
    } else {
      navigate(`/questions/${data.data.data.id}`);
    }
  };
  const { mutate: addQuestion } = useAddQuestion(onSuccess);

  const onPostQuestion = () => {
    if (!titleRef.current.value) {
      setTitleError(true);
      setTitleErrorMessage("Title is required!");
      return;
    } else if (titleRef.current.value.length < 6) {
      setTitleError(true);
      setTitleErrorMessage("Title must be at least 6 characters in length");
      return;
    } else {
      setTitleError(false);
    }

    if (!questionRef.current.value) {
      setBodyError(true);
      return;
    } else {
      setBodyError(false);
    }
    addQuestion({
      accessToken,
      body: {
        content: questionRef.current.value,
        html: questionRef.current.value,
        tags: selectedTag,
        title: titleRef.current.value,
      },
    });
  };

  useEffect(() => {
    const getTag = async () => {
      const response = await axios.get(`https://tessverso.io/node/api/v1/tag`);
      setSelectedTag([response.data.data]);
    };

    getTag();
  }, []);
  return (
    <Box sx={{ width: "90%", maxWidth: "1100px", minWidth: "450px" }}>
      <Typography component="span" variant="h4" color="text.primary">
        Add Question
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: 2,
          mb: 2,
        }}
      >
        <Typography component="span" variant="h6" color="text.primary">
          Title
        </Typography>
        <TextField
          id="outlined-basic"
          placeholder="Be specific and imagine you're asking a question to another person"
          variant="outlined"
          size="small"
          inputRef={titleRef}
        />
        {titleError && (
          <Typography
            component="span"
            variant="subtitle2"
            color="text.secondary"
          >
            {titleErrorMessage}
          </Typography>
        )}
        <Typography component="span" variant="h6" color="text.primary">
          Body
        </Typography>
        {bodyError && (
          <Typography
            component="span"
            variant="subtitle2"
            color="text.secondary"
          >
            Body is required!
          </Typography>
        )}
        <ReactQuill
          style={{ marginTop: "10px", marginBottom: "10px" }}
          ref={(element) => {
            if (element !== null) questionRef.current = element;
          }}
        />
        <Typography component="span" variant="h6" color="text.primary">
          Tags
        </Typography>
        <AddTag selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
        <Typography component="span" variant="subtitle2" color="text.secondary">
          Describe what your question is about, at least one tag is required.
        </Typography>
        {!showAnswer && (
          <Box>
            <Button variant="contained" size="small" onClick={onPostQuestion}>
              Post your question
            </Button>
            <Button variant="outlined" size="small">
              Cancel
            </Button>
          </Box>
        )}

        <FormControlLabel
          control={
            <Checkbox onChange={(e) => setShowAnswer(e.target.checked)} />
          }
          label="Answer your own question"
        />
        {showAnswer && (
          <Box>
            <Typography component="span" variant="h6" color="text.primary">
              Answer
            </Typography>
            <ReactQuill
              style={{ marginTop: "10px", marginBottom: "10px" }}
              ref={(element) => {
                if (element !== null) answerRef.current = element;
              }}
            />
            <Button variant="contained" size="small" onClick={onPostQuestion}>
              Post your question and answer
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
