import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./components/Header";
import "./App.css";
import QuestionList from "./components/QuestionList";

const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Header />
        <QuestionList />
      </QueryClientProvider>
    </div>
  );
}

export default App;
