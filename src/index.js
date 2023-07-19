import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { SSRProvider } from "react-bootstrap";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SSRProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SSRProvider>
  </React.StrictMode>
);
