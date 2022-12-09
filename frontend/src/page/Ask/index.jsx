import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AskQuestion from "../../components/AskQuestion";

export default function Ask() {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        position: "absolute",
        top: "100px",
        width: "100vw",
        paddingLeft: "10%",
        paddingRight: "10%",
        minWidth: "500px",
      }}
    >
      <AskQuestion />
    </Grid>
  );
}
