import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function SignUp() {
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
          label="Name"
          variant="outlined"
          size="small"
          sx={{ marginBottom: "20px", marginTop: "50px" }}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          size="small"
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          size="small"
        />
      </Box>
      <Button
        variant="contained"
        sx={{ width: "300px", marginTop: "20px", marginBottom: "80px" }}
      >
        Sign up
      </Button>
      <Typography component="span" variant="subtitle2" color="text.secondary">
        Already have an account? <Link to="/users/login">Log in</Link>
      </Typography>
    </Box>
  );
}
