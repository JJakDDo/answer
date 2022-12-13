import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AskQuestion from "../../components/AskQuestion";

export default function Ask() {
  return (
    <Grid
      container
      sx={{
        position: "absolute",
        top: "100px",
        width: "100vw",
        display: "flex",
        gap: 5,
        justifyContent: "center",
        minWidth: "500px",
      }}
    >
      <AskQuestion />
    </Grid>
  );
}
