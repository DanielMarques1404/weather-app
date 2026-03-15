import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { UnitProvider } from "./app/context/UnitContext.tsx";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <UnitProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </UnitProvider>
  </QueryClientProvider>,
);
