import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Typography from "@mui/material/Typography";
import CommentIcon from "@mui/icons-material/Comment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

import useStore from "../../store/store";
import { useFetchFollowingTags } from "../../hooks/tags";

export default function Following() {
  const accessToken = useStore((state) => state.accessToken);
  const { data: followingResponse } = useFetchFollowingTags(accessToken);
  const [following, setFollowing] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  useEffect(() => {
    if (followingResponse) {
      setFollowing(followingResponse.data.data);
    }
  }, [followingResponse]);

  if (!accessToken) return null;
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#bcbcbc",
        borderRadius: "10px",
        paddingBottom: "0px",
        marginBottom: "20px",
      }}
      subheader={
        <ListSubheader
          sx={{
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            backgroundColor: "#efeded",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Following Tags
            {editMode ? (
              <Button variant="text" size="small" onClick={toggleEditMode}>
                Save
              </Button>
            ) : (
              <Button variant="text" size="small" onClick={toggleEditMode}>
                Edit
              </Button>
            )}
          </Box>
        </ListSubheader>
      }
    >
      {following.length ? (
        <Box sx={{ p: 2, display: "flex", gap: 1 }}>
          {editMode ? (
            <>
              {following.map((tag, index) => (
                <Button key={index} size="small" variant="outlined">
                  {tag.slug_name}
                  <CloseIcon fontSize="small" />
                </Button>
              ))}

              <Button size="small" variant="outlined">
                <AddIcon fontSize="small" />
                Add tag
              </Button>
            </>
          ) : (
            following.map((tag, index) => (
              <Chip
                key={index}
                size="small"
                label={tag.slug_name}
                color="primary"
              />
            ))
          )}
        </Box>
      ) : (
        <Box sx={{ p: 2 }}>
          <Typography
            sx={{ display: "inline" }}
            component="span"
            variant="body1"
            color="text.secondary"
          >
            Follow tags to curate your list of questions.
          </Typography>
          <Link to="/tags">
            <Button variant="outlined" sx={{ mt: 1 }}>
              Follow a tag
            </Button>
          </Link>
        </Box>
      )}
    </List>
  );
}
