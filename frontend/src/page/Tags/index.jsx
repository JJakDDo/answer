import Box from "@mui/material/Box";
import TagList from "../../components/TagList";

export default function Tags() {
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
      <TagList />
    </Box>
  );
}
