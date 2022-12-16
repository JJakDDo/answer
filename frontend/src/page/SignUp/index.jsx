import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRef } from "react";
import { useState } from "react";
import { useSignUp } from "../../hooks/users";
import useStore from "../../store/store";

export default function SignUp() {
  const navigate = useNavigate();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [serverError, setServerError] = useState("");
  const setAccessToken = useStore((state) => state.setAccessToken);
  const setUsername = useStore((state) => state.setUsername);
  const setAvatar = useStore((state) => state.setAvatar);

  const onSignUpSuccess = (response) => {
    setAccessToken(response.data.data.access_token);
    setUsername(response.data.data.username);
    setAvatar(response.data.data.avatar);
    navigate("/");
    console.log(response);
  };

  // argument 이름이 error면 되고 err이면 안된다.
  // 이상하다
  const onSignUpError = (error) => {
    setServerError(error.response.data.msg);
  };

  const { mutate: signUp } = useSignUp(onSignUpSuccess, onSignUpError);

  const onSignUp = () => {
    if (!nameRef.current.value) {
      setNameError(true);
    } else {
      setNameError(false);
    }

    if (!emailRef.current.value) {
      setEmailError(true);
    } else {
      setNameError(false);
    }

    if (!passwordRef.current.value) {
      setPasswordError(true);
    } else {
      setNameError(false);
    }

    if (
      !nameRef.current.value ||
      !emailRef.current.value ||
      !passwordRef.current.value
    )
      return;

    signUp({
      e_mail: emailRef.current.value,
      name: nameRef.current.value,
      pass: passwordRef.current.value,
    });
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "100px",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography component="span" variant="h4" color="text.primary">
        Welcome to Answer
      </Typography>
      <Box
        mt={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "300px",
          gap: 3,
        }}
      >
        {serverError && (
          <Typography
            variant="subtitle2"
            color="red"
            sx={{ paddingLeft: "10px" }}
          >
            {serverError}
          </Typography>
        )}
        <Box>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            size="small"
            sx={{ marginTop: "50px", width: "100%" }}
            inputRef={nameRef}
          />
          {nameError && (
            <Typography
              variant="subtitle2"
              color="red"
              sx={{ paddingLeft: "10px" }}
            >
              Name cannot be empty.
            </Typography>
          )}
        </Box>
        <Box>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            size="small"
            inputRef={emailRef}
            sx={{ width: "100%" }}
          />
          {emailError && (
            <Typography
              variant="subtitle2"
              color="red"
              sx={{ paddingLeft: "10px", marginBottom: "20px" }}
            >
              Email cannot be empty.
            </Typography>
          )}
        </Box>
        <Box>
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            size="small"
            inputRef={passwordRef}
            sx={{ width: "100%" }}
          />
          {passwordError && (
            <Typography
              variant="subtitle2"
              color="red"
              sx={{ paddingLeft: "10px" }}
            >
              Password cannot be empty.
            </Typography>
          )}
        </Box>
      </Box>
      <Button
        variant="contained"
        sx={{ width: "300px", marginTop: "20px", marginBottom: "80px" }}
        onClick={onSignUp}
      >
        Sign up
      </Button>
      <Typography component="span" variant="subtitle2" color="text.secondary">
        Already have an account? <Link to="/users/login">Log in</Link>
      </Typography>
    </Box>
  );
}
