// index.js — the ENTRY POINT of the React app.
// It renders the top-level <App /> component into the #root div in index.html.

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

// Find the mount point in public/index.html.
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the component tree. <React.StrictMode> turns on extra dev-time checks.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
