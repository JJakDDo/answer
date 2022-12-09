import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./components/Header";
import Home from "./page/Home";
import Tags from "./page/Tags";
import QuestionDetails from "./page/QuestionDetails";
import Ask from "./page/Ask";
import Login from "./page/Login";
import SignUp from "./page/SignUp";

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
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/register" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
