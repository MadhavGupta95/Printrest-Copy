import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import React from "react";
import "./index.css";
import { BrowserRouter } from "react-router";
import store from "./redux/store/index.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
