import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import ReactGA from "react-ga4";

import App from "./App.jsx";
import "./index.css";

ReactGA.initialize("G-23SW8E138E");

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);
