import React from "react";
import ReactDom from "react-dom/client";
import App from "./src/App.tsx";
// import * as css from "./index.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./src/userContext/userProvider";

const root = ReactDom.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter> 
    </UserProvider>
  </React.StrictMode>,
);
