import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 1. Bootstrap betöltése
import "bootstrap/dist/css/bootstrap.min.css";
// 2. Saját stílusok betöltése (fontos a sorrend!)
import "./index.css"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);