import React from "react"; // Explicitly import React if using StrictMode
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30, // Note: 'cacheTime' was renamed to 'gcTime' in TanStack Query v5
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// FIX: Use 'createRoot' directly, not 'ReactDOM.createRoot'
const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
