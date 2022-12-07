import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import QuestionList from "../../components/QuestionList";
import Details from "../../components/Details";
import HotQuestions from "../../components/HotQuestions";
import Following from "../../components/Following";

export default function QuestionDetails() {
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
      <Grid item xs={12} lg={8}>
        <Details />
      </Grid>
      <Grid item xs={12} lg={4}>
        <HotQuestions />
      </Grid>
    </Grid>
  );
}
