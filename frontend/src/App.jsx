import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./components/Header";
import "./App.css";
import QuestionList from "./components/QuestionList";
import HotQuestions from "./components/HotQuestions";

const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Header />
        <QuestionList />
        <HotQuestions />
      </QueryClientProvider>
    </div>
  );
}

export default App;
