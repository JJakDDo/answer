import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useLogin } from "../../hooks/users";
import useStore from "../../store/store";

export default function Login() {
  const navigate = useNavigate();
  const setAccessToken = useStore((state) => state.setAccessToken);
  const setUsername = useStore((state) => state.setUsername);
  const setAvatar = useStore((state) => state.setAvatar);
  const onSuccess = (response) => {
    setAccessToken(response.data.data.access_token);
    setUsername(response.data.data.username);
    setAvatar(response.data.data.avatar);
    navigate("/");
  };
  const { mutate: login } = useLogin(onSuccess);
  const emailRef = useRef(null);
  const passRef = useRef(null);

  const handleLogin = () => {
    login({
      e_mail: emailRef.current.value,
      pass: passRef.current.value,
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
        }}
      >
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          size="small"
          sx={{ marginBottom: "20px", marginTop: "50px" }}
          inputRef={emailRef}
        />
        <Typography
          component="span"
          variant="subtitle2"
          color="text.secondary"
          sx={{ alignSelf: "flex-end", margin: 0, padding: 0 }}
        >
          Forgot password?
        </Typography>
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          size="small"
          inputRef={passRef}
        />
      </Box>
      <Button
        variant="contained"
        sx={{ width: "300px", marginTop: "20px", marginBottom: "80px" }}
        onClick={handleLogin}
      >
        Log in
      </Button>
      <Typography component="span" variant="subtitle2" color="text.secondary">
        Don't have an account? <Link to="/users/register">Sign up</Link>
      </Typography>
    </Box>
  );
}
