import React from "react";
import ReactDOM from "react-dom";
import App from "./App"; // Importing the App component
import "./App.css";

ReactDOM.render(
  <div>
    <App /> {/* Rendering the App component */}
  </div>,
  document.getElementById("root") // Make sure there's a corresponding div with id="root" in your HTML
);
