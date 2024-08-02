import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SelectedIdContextPRovider from "./provider/selectedIdContextPRovider.jsx";

// setting staleTime to 5000ms

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SelectedIdContextPRovider>
        <App />
      </SelectedIdContextPRovider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
