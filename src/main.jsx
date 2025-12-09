import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes/Router";
import { ThemeProvider } from "./context/ThemeContext";
import AuthProvider from "./context/AuthProvider";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />,
        </AuthProvider>
      </QueryClientProvider>
      <ToastContainer />
    </ThemeProvider>
  </StrictMode>
);
