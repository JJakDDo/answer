import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./components/Header";
import "./App.css";
import Home from "./page/Home";
import Tags from "./page/Tags";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tags" element={<Tags />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
