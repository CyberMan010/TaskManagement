import React from "react";
import ReactDOM from "react-dom/client";
import { TasksPage } from "./pages/TasksPage";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TasksPage />
  </React.StrictMode>
);


