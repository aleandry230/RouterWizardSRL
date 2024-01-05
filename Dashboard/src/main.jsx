import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <NextThemesProvider attribute="class" defaultTheme="dark">
      <Router>
        <App />
      </Router>
    </NextThemesProvider>
  </NextUIProvider>
);
