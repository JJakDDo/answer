import Box from "@mui/material/Box";
import QuestionList from "../../components/QuestionList";
import HotQuestions from "../../components/HotQuestions";
import Following from "../../components/Following";

export default function Home() {
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
      <QuestionList />
      <Box>
        <Following />
        <HotQuestions />
      </Box>
    </Box>
  );
}
