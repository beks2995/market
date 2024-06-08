import React from "react";
import ReactDOM from "react-dom";
import App from "./App"; // Importing the App component
import "./App.css";
import { BrowserRouter as Router} from 'react-router-dom';


ReactDOM.render(
  <Router>
    <App /> {/* Rendering the App component */}
  </Router>,
  document.getElementById("root") // Make sure there's a corresponding div with id="root" in your HTML
);
