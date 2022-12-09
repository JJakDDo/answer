import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./components/Header";
import Home from "./page/Home";
import Tags from "./page/Tags";
import QuestionDetails from "./page/QuestionDetails";
import Ask from "./page/Ask";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/questions/:id" element={<QuestionDetails />} />
          <Route path="/questions/ask" element={<Ask />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
