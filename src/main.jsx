import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes/Router";
import { ThemeProvider } from "./context/ThemeContext";
import AuthProvider from "./context/AuthProvider";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />,
      </AuthProvider>
      <ToastContainer />
    </ThemeProvider>
  </StrictMode>
);
