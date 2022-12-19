import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Popper from "@mui/material/Popper";
import TextField from "@mui/material/TextField";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useSearchTag } from "../../hooks/tags";
import CloseIcon from "@mui/icons-material/Close";
import useStore from "../../store/store";
import NewTag from "../NewTag";

export default function AddTag({ selectedTag, setSelectedTag }) {
  const accessToken = useStore((state) => state.accessToken);
  const [tag, setTag] = useState("");
  const [matchingTag, setMatchingTag] = useState([]);
  const { data: searchTagResponse } = useSearchTag(accessToken, tag);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setMatchingTag([]);
  };

  const addSelectedTag = (e) => {
    const tempArr = [...selectedTag];
    tempArr.push({
      slug_name: e.target.innerText,
    });
    setSelectedTag(tempArr);
    handleClick(e);
  };

  const addNewTag = (data) => {
    const tempArr = [...selectedTag];
    tempArr.push(data);
    setSelectedTag(tempArr);
  };

  const searchInputChange = (e) => {
    if (e.target.value) {
      setTag(e.target.value);
    } else {
      setTag("");
      setMatchingTag([]);
    }
  };

  useEffect(() => {
    if (searchTagResponse?.data?.data) {
      setMatchingTag(
        searchTagResponse.data.data.filter(
          (tag) => selectedTag.findIndex((t) => t.slug_name === tag) < 0
        )
      );
    }
  }, [searchTagResponse]);

  return (
    <>
      <Box sx={{ display: "flex", gap: 1 }}>
        {selectedTag.length > 0 && (
          <>
            {selectedTag.map((tag, index) => (
              <Button key={index} size="small" variant="outlined">
                {tag.slug_name}
                {/* <CloseIcon fontSize="small" /> */}
              </Button>
            ))}
          </>
        )}
        {/* <div>
          <Button
            variant="outlined"
            size="small"
            onClick={handleClick}
            sx={{ position: "relative" }}
          >
            + Add Tag
          </Button>
          <Popper open={open} anchorEl={anchorEl}>
            <Box
              sx={{
                position: "absolute",
                top: 10,
                left: -43,
                width: "150px",
                border: 1,
                borderRadius: "5px",
                p: 2,
                bgcolor: "background.paper",
              }}
            >
              <TextField
                placeholder="Search tag"
                variant="outlined"
                size="small"
                onChange={(e) => searchInputChange(e)}
              />
              {matchingTag.length > 0 && (
                <List>
                  {matchingTag.map((tag, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton onClick={(e) => addSelectedTag(e)}>
                        <ListItemText primary={tag} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              )}
              {tag && (
                <Button onClick={() => setOpenModal(true)}>
                  + Create new tag
                </Button>
              )}
            </Box>
          </Popper>
        </div> */}
      </Box>
      <NewTag
        open={openModal}
        handleClose={() => setOpenModal(false)}
        addNewTag={addNewTag}
      />
    </>
  );
}
