import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import useStore from "../../../store/store";
import {
  useUpdateUserInfo,
  useUploadAvatar,
  useUserInfo,
} from "../../../hooks/users";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Profile() {
  // const { data: questions } = useGetQuestions();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileType, setProfileType] = useState("default");
  const [customAvatar, setCustomAvatar] = useState("");
  const [error, setError] = useState(false);
  const bioRef = useRef(null);
  const displayNameRef = useRef(null);
  const locationRef = useRef(null);
  const usernameRef = useRef(null);
  const websiteRef = useRef(null);
  const customAvatarRef = useRef(null);
  const accessToken = useStore((state) => state.accessToken);
  const setUsername = useStore((state) => state.setUsername);
  const setAvatar = useStore((state) => state.setAvatar);

  const onProfileTypeChange = (e) => {
    setProfileType(e.target.value);
  };

  const { data: userInfoResponse, refetch } = useUserInfo(accessToken);

  const onUpdateSuccess = (response) => {
    setOpen(true);
    refetch();
  };
  const { mutate: updateProfile } = useUpdateUserInfo(onUpdateSuccess);

  const onUploadAvatarSuccess = (response) => {
    updateProfile({
      accessToken,
      body: {
        bio: bioRef.current.value,
        bio_html: bioRef.current.value,
        display_name: displayNameRef.current.value,
        location: locationRef.current.value,
        username: usernameRef.current.value,
        website: websiteRef.current.value,
        avatar: {
          type: profileType,
          gravatar: "",
          custom: response.data.data,
        },
      },
    });
  };

  const { mutate: uploadAvatar } = useUploadAvatar(onUploadAvatarSuccess);

  const onAvatarChange = () => {
    setCustomAvatar(URL.createObjectURL(customAvatarRef.current.files[0]));
  };

  const onUpdateProfile = () => {
    if (profileType === "custom") {
      if (customAvatarRef.current.files.length <= 0) {
        setError(true);
        return;
      }

      setError(false);

      const frm = new FormData();
      frm.append("file", customAvatarRef.current.files[0]);

      uploadAvatar({ accessToken, form: frm });
    } else {
      updateProfile({
        accessToken,
        body: {
          bio: bioRef.current.value,
          bio_html: bioRef.current.value,
          display_name: displayNameRef.current.value,
          location: locationRef.current.value,
          username: usernameRef.current.value,
          website: websiteRef.current.value,
          avatar: {
            type: profileType,
            gravatar:
              profileType === "gravatar"
                ? `https://www.gravatar.com/avatar/64e1b8d34f425d19e1ee2ea7236d3028?s=256&d=identicon&t=1671091423386&d=identicon`
                : "",
          },
        },
      });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    if (userInfoResponse) {
      setUser(userInfoResponse.data.data);
      setProfileType(userInfoResponse.data.data.avatar.type);
      setAvatar(
        userInfoResponse.data.data.avatar.custom ||
          userInfoResponse.data.data.avatar.gravatar
      );
      setUsername(userInfoResponse.data.data.username);
    }
  }, [userInfoResponse]);

  useEffect(() => {
    console.log(profileType);
  }, [profileType]);

  if (!user) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        top: "100px",
        width: "100vw",
        display: "flex",
        gap: 5,
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "90%", maxWidth: "1100px", minWidth: "450px" }}>
        <Typography component="span" variant="h4" color="text.primary">
          Settings
        </Typography>
        <Grid container spacing={2} sx={{ alignItems: "stretch" }}>
          <Grid item md={2}>
            <List component="nav" aria-label="secondary mailbox folder">
              <ListItemButton selected onClick={() => {}}>
                <ListItemText primary="Profile" />
              </ListItemButton>
              <ListItemButton onClick={() => {}}>
                <ListItemText primary="Notifications" />
              </ListItemButton>
              <ListItemButton onClick={() => {}}>
                <ListItemText primary="Account" />
              </ListItemButton>
              <ListItemButton onClick={() => {}}>
                <ListItemText primary="Interface" />
              </ListItemButton>
            </List>
          </Grid>
          <Grid
            item
            md={10}
            sx={{ display: "flex", flexDirection: "Column", gap: 2 }}
          >
            <Box>
              <Typography variant="body1" color="text.primary">
                Display name
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                sx={{ width: "100%" }}
                defaultValue={user.display_name}
                inputRef={displayNameRef}
              ></TextField>
            </Box>
            <Box>
              <Typography variant="body1" color="text.primary">
                Username
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                sx={{ width: "100%" }}
                defaultValue={user.username}
                inputRef={usernameRef}
              ></TextField>
              <Typography variant="subtitle2" color="text.secondary">
                People can mention you as "@username".
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body1" color="text.primary">
                Profile Image
              </Typography>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={profileType}
                  onChange={onProfileTypeChange}
                >
                  <FormControlLabel
                    value="gravatar"
                    control={<Radio />}
                    label="Gravatar"
                  />
                  <FormControlLabel
                    value="custom"
                    control={<Radio />}
                    label="Custom"
                  />
                  <FormControlLabel
                    value="default"
                    control={<Radio />}
                    label="Default"
                  />
                </RadioGroup>
              </FormControl>
              <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
                {error && (
                  <Typography variant="subtitle2" color="text.secondary">
                    Please choose avatar image
                  </Typography>
                )}
                {profileType === "custom" ? (
                  <>
                    <img
                      src={
                        customAvatar ||
                        `http://tessverso.io:9080/static/media/default-avatar.ac1be9284e893e315871fa5e571cabaf.svg`
                      }
                      loading="lazy"
                      width={150}
                    />
                    <Button variant="contained" component="label">
                      Upload File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={onAvatarChange}
                        ref={customAvatarRef}
                        hidden
                      />
                    </Button>
                  </>
                ) : (
                  <img
                    src={
                      profileType === "gravatar"
                        ? `https://www.gravatar.com/avatar/64e1b8d34f425d19e1ee2ea7236d3028?s=256&d=identicon&t=1671091423386&d=identicon`
                        : `http://tessverso.io:9080/static/media/default-avatar.ac1be9284e893e315871fa5e571cabaf.svg`
                    }
                    loading="lazy"
                    width={150}
                  />
                )}
              </Box>
            </Box>
            <Box>
              <Typography variant="body1" color="text.primary">
                About me (optional)
              </Typography>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                maxRows={4}
                sx={{ width: "100%" }}
                defaultValue={user.bio}
                inputRef={bioRef}
              />
            </Box>
            <Box>
              <Typography variant="body1" color="text.primary">
                Website (optional)
              </Typography>
              <TextField
                id="outlined-basic"
                placeholder="https://example.com"
                variant="outlined"
                size="small"
                sx={{ width: "100%" }}
                defaultValue={user.website}
                inputRef={websiteRef}
              ></TextField>
            </Box>
            <Box>
              <Typography variant="body1" color="text.primary">
                Location (optional)
              </Typography>
              <TextField
                id="outlined-basic"
                placeholder="City, Country"
                variant="outlined"
                size="small"
                sx={{ width: "100%" }}
                defaultValue={user.location}
                inputRef={locationRef}
              ></TextField>
            </Box>
            <Box>
              <Button variant="contained" onClick={onUpdateProfile}>
                Update
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Update Success!
        </Alert>
      </Snackbar>
    </Box>
  );
}
