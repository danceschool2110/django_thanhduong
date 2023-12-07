import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lesson from "./component/lesson";
import Tag from "./component/tag";
import { Box } from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        padding: 2,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Lesson />} />
          <Route path="/tags" element={<Tag />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
